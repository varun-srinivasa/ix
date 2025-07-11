'use client';
/*
 * SPDX-FileCopyrightText: 2024 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { defineCustomElement as defineToastContainer } from '@siemens/ix/components/ix-toast-container.js';
import { defineCustomElement as defineToast } from '@siemens/ix/components/ix-toast.js';

import { toast, ToastConfig as IxToastConfig } from '@siemens/ix';
import ReactDOMClient from 'react-dom/client';

export type ToastConfig = {
  message?: string | React.ReactNode;
  action?: React.ReactNode;
};

export async function showToast(
  config: Omit<IxToastConfig, 'message' | 'action'> & ToastConfig
) {
  // Define custom element, otherwise dynamic creation of toast container will fail
  defineToast();
  defineToastContainer();

  if (typeof config.message === 'string' && !config.action) {
    const toastInstance = await toast(config as IxToastConfig);
    return toastInstance;
  }

  let toastContainer: HTMLElement | undefined;
  let root: ReactDOMClient.Root | undefined;

  if (config.message) {
    toastContainer = document.createElement('DIV');
    root = ReactDOMClient.createRoot(toastContainer);
    root.render(config.message);
  }

  let toastContainerAction: HTMLElement | undefined;

  if (config.action) {
    toastContainerAction = document.createElement('DIV');
    root = ReactDOMClient.createRoot(toastContainerAction);
    root.render(config.action);
  }

  const toastInstance = await toast({
    ...config,
    message: toastContainer,
    action: toastContainerAction,
  });

  toastInstance.onClose.once(() => {
    root?.unmount();
  });

  return toastInstance;
}
