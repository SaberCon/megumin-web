import { LockTwoTone } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const PasswordInput: typeof ProFormText.Password = (props) => {
  const fieldProps: typeof props.fieldProps = {
    size: 'large',
    prefix: <LockTwoTone />,
    ...(props.fieldProps ?? {})
  };
  return (
    <ProFormText.Password
      name="password"
      placeholder="密码"
      rules={[
        {
          required: true,
          message: '请输入密码',
        },
      ]}
      {...props}
      fieldProps={fieldProps}
    />
  );
};

export default PasswordInput;
