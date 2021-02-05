import { getCurrentUserInfo, updateUser } from '@/services/user';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Radio, Upload } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import styles from './BaseView.less';

const AvatarView: React.FC<{ avatar: string; setAvatar: (avatar: string) => void }> = ({
  avatar,
  setAvatar,
}) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [avatar, setAvatar] = useState(currentUser?.avatar);

  const updateUserInfo = async (values: any) => {
    try {
      await updateUser({ avatar, ...values });
      message.success('更新成功');
      setInitialState({ ...initialState, currentUser: await getCurrentUserInfo() });
    } catch (e) {
      // ignored
    }
  };

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={updateUserInfo}
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
            <Button htmlType="submit" type="primary">
              更新基本信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={avatar as string} setAvatar={setAvatar} />
      </div>
    </div>
  );
};
