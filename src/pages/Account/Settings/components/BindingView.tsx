import { AlipayOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React from 'react';

const dataSource = [
  {
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    actions: [<a key="Bind">绑定</a>],
    avatar: <TaobaoOutlined className="taobao" />,
  },
  {
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    actions: [<a key="Bind">绑定</a>],
    avatar: <AlipayOutlined className="alipay" />,
  },
];

export default () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta avatar={item.avatar} title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};
