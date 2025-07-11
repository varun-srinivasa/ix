/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IxTimePicker } from '@siemens/ix-react';

export default () => {
  return <IxTimePicker format="hh:mm:ss.SSS" time="01:01:01.100" />;
};
