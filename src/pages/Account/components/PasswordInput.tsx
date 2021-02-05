import { LockTwoTone } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

export default (props: any) => (
  <ProFormText.Password
    name="password"
    fieldProps={{
      size: 'large',
      prefix: <LockTwoTone />,
    }}
    placeholder="密码"
    rules={[
      {
        required: true,
        message: '请输入密码',
      },
    ]}
    {...props}
  />
);
