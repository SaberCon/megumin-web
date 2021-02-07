import React, { useState } from 'react';
import { Popover, Progress, message } from 'antd';
import useCurrentUser from '@/hooks/useCurrentUser';
import ProForm from '@ant-design/pro-form';
import { SmsType, updatePwd } from '@/services/user';
import PhoneInput from '../../components/PhoneInput';
import PasswordInput from '../../components/PasswordInput';
import Captcha from '../../components/Captcha';
import styles from '../style.less';

type PasswordStatus = 'strong' | 'medium' | 'weak';

const passwordStatusMap = {
  strong: '强',
  medium: '中',
  weak: '弱',
};

const passwordProgressMap: Record<PasswordStatus, 'normal' | 'exception' | 'active' | 'success'> = {
  strong: 'success',
  medium: 'normal',
  weak: 'exception',
};

export default () => {
  const { currentUser, refreshCurrentUser } = useCurrentUser(true);
  const [passwordLength, setPasswordLength] = useState(0);
  const [form] = ProForm.useForm();
  const passwordStatus: PasswordStatus =
    // eslint-disable-next-line no-nested-ternary
    passwordLength > 12 ? 'strong' : passwordLength > 6 ? 'medium' : 'weak';

  return (
    <ProForm
      form={form}
      submitter={{
        searchConfig: { submitText: '修改密码' },
      }}
      onFinish={async (values) => {
        await updatePwd(values.password, values.code);
        message.success('修改密码成功');
        refreshCurrentUser();
      }}
      style={{ maxWidth: '360px', paddingTop: '12px' }}
    >
      <PhoneInput disabled initialValue={currentUser.phone} />
      <Captcha smsType={SmsType.UPDATE_PWD} />
      <Popover
        content={
          <>
            <div className={styles[`color-${passwordStatus}`]}>
              强度: {passwordStatusMap[passwordStatus]}
            </div>
            <Progress
              status={passwordProgressMap[passwordStatus]}
              percent={passwordLength * 5}
              showInfo={false}
            />
            <div>请至少输入 6 个字符, 不要使用容易被猜到的密码</div>
          </>
        }
        overlayStyle={{ maxWidth: 240 }}
        placement="right"
        visible={passwordLength > 0}
      >
        <PasswordInput
          fieldProps={{
            onChange: (e) => {
              form.setFieldsValue({ password: e.target.value });
              setPasswordLength(e.target.value.length);
            },
          }}
        />
      </Popover>
    </ProForm>
  );
};
