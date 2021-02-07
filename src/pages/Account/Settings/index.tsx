import { GridContent } from '@ant-design/pro-layout';
import { useSize } from 'ahooks';
import { Menu } from 'antd';
import type { MenuMode } from 'antd/lib/menu';
import React, { useState } from 'react';
import { history, useParams } from 'umi';
import BaseView from './components/BaseView';
import BindingView from './components/BindingView';
import NotificationView from './components/NotificationView';
import SecurityView from './components/SecurityView';
import styles from './style.less';

type StateKey = 'base' | 'security' | 'binding' | 'notification';

const menuMap = {
  base: '基本设置',
  security: '安全设置',
  binding: '账号绑定',
  notification: '消息通知',
};

const viewMap = {
  base: <BaseView />,
  security: <SecurityView />,
  binding: <BindingView />,
  notification: <NotificationView />,
};

export default () => {
  let { type } = useParams<{ type: StateKey }>();
  if (!menuMap[type]) {
    type = 'base';
  }
  const size = useSize(document.body);
  let mode: MenuMode = 'inline';
  if (size.width && size.width < 768 && size.width > 464) {
    mode = 'horizontal';
  }

  return (
    <GridContent>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu
            mode={mode}
            selectedKeys={[type]}
            onClick={({ key }) => history.push(`/account/settings/${key}`)}
          >
            {Object.keys(menuMap).map((item) => (
              <Menu.Item key={item}>{menuMap[item]}</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[type]}</div>
          {viewMap[type]}
        </div>
      </div>
    </GridContent>
  );
};
