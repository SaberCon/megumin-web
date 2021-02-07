import { MobileTwoTone } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import React from 'react';

const PhoneInput: typeof ProFormText = (props) => {
  // 手机号为禁用状态时一般只是作展示用, 无需校验
  const rules = props.disabled ? [] : [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      pattern: /^1\d{10}$/,
      message: '手机号不合法',
    },
  ];
  const fieldProps: typeof props.fieldProps = {
    size: 'large',
    prefix: <MobileTwoTone />,
    ...(props.fieldProps ?? {})
  };
  return (
    <ProFormText
      name="phone"
      placeholder="手机号"
      rules={rules}
      {...props}
      fieldProps={fieldProps}
    />
  );
};

export default PhoneInput;
