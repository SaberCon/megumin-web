import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Link, history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login, sendCode, SmsType } from '@/services/user';
import styles from './index.less';

// 展示报错信息, 暂时不使用
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => history.push((history.location.query?.redirect as string) || '/'), 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState<'pwd' | 'sms'>('pwd');
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const currentUser = await initialState?.fetchUserInfo?.();
    if (currentUser) {
      setInitialState({ ...initialState, currentUser });
    }
  };

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const token = await login(values.phone, type === 'pwd' ? values.password : values.code, type);
      if (values.autoLogin) {
        localStorage.setItem(TOKEN_HEADER, token);
      } else {
        sessionStorage.setItem(TOKEN_HEADER, token);
      }
      message.success('登录成功');
      await fetchUserInfo();
      goto();
    } catch (error) {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="http://oss.sabercon.cn/base/logo.svg" />
              <span className={styles.title}>Megumin</span>
            </Link>
          </div>
          <div className={styles.desc}>Megumin 是采用 Ant Design 设计的论坛系统</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={handleSubmit}
          >
            <Tabs activeKey={type} onChange={setType}>
              <Tabs.TabPane key="pwd" tab="密码登录" />
              <Tabs.TabPane key="sms" tab="验证码登录" />
            </Tabs>

            <ProFormText
              name="phone"
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
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
            />

            {type === 'pwd' && (
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              />
            )}

            {type === 'sms' && (
              <ProFormCaptcha
                name="code"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
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
                phoneName="phone"
                onGetCaptcha={async (mobile) => sendCode(SmsType.LOGIN, mobile)}
              />
            )}
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
            </div>
          </ProForm>
          <Space className={styles.other}>
            其他登录方式 :
            <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
          </Space>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
