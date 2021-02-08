import React, { useState } from 'react';
import { StepsForm } from '@ant-design/pro-form';
import { message, Result } from 'antd';
import useCurrentUser from '@/hooks/useCurrentUser';
import { SmsType, updatePhone, checkCode } from '@/services/user';
import PhoneInput from '../../components/PhoneInput';
import Captcha from '../../components/Captcha';

export default () => {
  const { currentUser, refreshCurrentUser } = useCurrentUser(true);
  const [unbindCode, setUnbindCode] = useState('');
  return (
    <div style={{ paddingTop: '12px' }}>
      <StepsForm submitter={{ render: ({ step }, dom) => (step === 2 ? false : dom) }}>
        <StepsForm.StepForm
          title="验证身份"
          onFinish={async (values) => {
            try {
              if (!(await checkCode(SmsType.UNBIND_PHONE, values.unbindCode))) {
                message.error('验证码错误');
                return false;
              }
              setUnbindCode(values.unbindCode);
              return true;
            } catch (error) {
              return false;
            }
          }}
          layout="horizontal"
        >
          <PhoneInput disabled initialValue={currentUser.phone} name="currentPhone" />
          <Captcha smsType={SmsType.UNBIND_PHONE} phoneName="currentPhone" name="unbindCode" />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          title="绑定手机"
          onFinish={async (values) => {
            try {
              await updatePhone(values.phone, unbindCode, values.code);
              refreshCurrentUser();
              return true;
            } catch (error) {
              return false;
            }
          }}
          layout="horizontal"
        >
          <PhoneInput />
          <Captcha smsType={SmsType.BIND_PHONE} />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="操作成功">
          <Result status="success" title="您的手机号已修改成功" />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};
