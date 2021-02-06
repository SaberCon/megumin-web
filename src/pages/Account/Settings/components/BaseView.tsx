import { getCurrentUserInfo, getOssData, updateUser } from '@/services/user';
import { UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Form, Input, message, Radio, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/lib/upload';
import type { RcFile, UploadFile } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { useModel } from 'umi';
import styles from './BaseView.less';

const AvatarView: React.FC<{ avatar: string; setAvatar: (avatar: string) => void }> = ({
  avatar,
  setAvatar,
}) => {
  const { data, run } = useRequest(getOssData, { manual: true });

  const beforeUpload = async (file: RcFile, _: any) => {
    if (!data || data?.expire < Date.now()) {
      await run();
    }
    const now = new Date();
    file.url = `img/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}/${Date.now()}-${
      file.name
    }`;
    return file;
  };

  const getExtraData = (file: UploadFile) => {
    return {
      key: file.url,
      OSSAccessKeyId: data?.accessId,
      policy: data?.policy,
      Signature: data?.signature,
    };
  };

  const onChange = ({ file }: UploadChangeParam) => {
    if (file.status === 'done') {
      setAvatar(`${data?.host}/${file.url}`);
    }
  };

  return (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        accept="image/*"
        showUploadList={false}
        action={data?.host}
        onChange={onChange}
        data={getExtraData}
        beforeUpload={beforeUpload}
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const { loading, run } = useRequest(updateUser, {
    manual: true,
    onSuccess: async () => {
      message.success('更新成功');
      setInitialState({ ...initialState, currentUser: await getCurrentUserInfo() });
    },
  });

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={(values) => run({ avatar, ...values })}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            name="username"
            label="昵称"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="about" label="个人简介">
            <Input.TextArea placeholder="写一些让人印象深刻的骚话吧~" rows={4} />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Radio.Group size="large">
              <Radio.Button value="boy">男</Radio.Button>
              <Radio.Button value="girl">女</Radio.Button>
              <Radio.Button value="unknown">保密</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              更新基本信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={avatar ?? ''} setAvatar={setAvatar} />
      </div>
    </div>
  );
};
