import type { SmsType } from '@/services/user';
import { sendCode } from '@/services/user';
import { MailTwoTone } from '@ant-design/icons';
import type { ProFormCaptchaProps } from '@ant-design/pro-form';
import { ProFormCaptcha } from '@ant-design/pro-form';
import React from 'react';

interface CaptchaProps extends ProFormCaptchaProps {
  onGetCaptcha?: (mobile: string) => Promise<void>;
  smsType: SmsType;
}

export default ({ smsType, ...restProps }: CaptchaProps) => (
  <ProFormCaptcha
    name="code"
    phoneName="phone"
    fieldProps={{
      size: 'large',
      prefix: <MailTwoTone />,
    }}
    captchaProps={{
      size: 'large',
    }}
    placeholder="验证码"
    captchaTextRender={(timing, count) => (timing ? `${count} 秒` : '获取验证码')}
    rules={[
      {
        required: true,
        message: '请输入验证码',
      },
    ]}
    onGetCaptcha={async (mobile) => sendCode(smsType, mobile)}
    {...restProps}
  />
);
