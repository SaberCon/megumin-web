import { MobileTwoTone } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

export default (props: any) => (
  <ProFormText
    name="phone"
    fieldProps={{
      size: 'large',
      prefix: <MobileTwoTone />,
    }}
    placeholder="手机号"
    rules={[
      {
        required: true,
        message: '请输入手机号',
      },
      {
        pattern: /^1\d{10}$/,
        message: '手机号不合法',
      },
    ]}
    {...props}
  />
);
