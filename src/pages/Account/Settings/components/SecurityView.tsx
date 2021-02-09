import { useCurrentUserOrGoToLogin } from '@/hooks/useCurrentUser';
import { List } from 'antd';
import React from 'react';
import { history, useParams } from 'umi';
import PhoneUpdateView from './PhoneUpdateView';
import PasswordUpdateView from './PasswordUpdateView';

type StateKey = 'phone' | 'password';

const viewMap = {
  phone: <PhoneUpdateView />,
  password: <PasswordUpdateView />,
};

const getModifyAction = (type: StateKey) => {
  return <a onClick={() => history.push(`/account/settings/security/${type}`)}>修改</a>;
};

export default () => {
  const { subtype } = useParams<{ subtype: StateKey }>();
  const { currentUser } = useCurrentUserOrGoToLogin();
  if (!viewMap[subtype]) {
    const dataSource = [
      {
        title: '密保手机',
        description: `已绑定手机：${currentUser.phone}`,
        actions: [getModifyAction('phone')],
      },
      {
        title: '账号密码',
        description: '需要手机号验证',
        actions: [getModifyAction('password')],
      },
    ];

    return (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    );
  }

  return viewMap[subtype];
};
