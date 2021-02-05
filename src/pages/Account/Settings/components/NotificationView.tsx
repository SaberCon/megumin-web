import { List, Switch } from 'antd';
import React from 'react';

const dataSource = [
  {
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
    actions: [<Switch defaultChecked />],
  },
];

export default () => {
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
};
