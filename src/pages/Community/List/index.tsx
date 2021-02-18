import { GridContent } from '@ant-design/pro-layout';
import React, { useRef } from 'react';
import { Card, List, Avatar, Button } from 'antd';
import type { Mutate, LoadMoreFormatReturn } from '@ahooksjs/use-request/lib/types';
import { CheckOutlined } from '@ant-design/icons';
import { useHover, useRequest } from 'ahooks';
import type { Community } from '@/services/community';
import { joinCommunity, listHotCommunity } from '@/services/community';
import { calcNextPage } from '@/utils/request';

const JoinButton: React.FC<{
  id: number;
  joined: boolean;
  mutates: Mutate<LoadMoreFormatReturn>[];
}> = ({ id, joined, mutates }) => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const { loading, run } = useRequest(joinCommunity, {
    manual: true,
    onSuccess: () =>
      mutates.forEach((mutate) =>
        mutate((d) => {
          const curr = d.list.find((e) => e.id === id);
          if (curr) {
            curr.joined = !joined;
          }
          return d;
        }),
      ),
  });

  return (
    <Button ref={ref} onClick={() => run(id, joined)} loading={loading}>
      {joined ? (isHovering ? '取消加入' : '已加入') : '加入'}
    </Button>
  );
};

export default () => {
  /* todo 此处 loadMore 有缺陷, 参考 useLoadMore.ts 源码可知这个设置只能应用在有滚动条的元素上, 
  document 和 window 有滚动事件却没有滚动属性, 非滚动元素有滚动属性却没有滚动事件, 需要自己重新实现这一功能 */
  const ref = useRef(document.scrollingElement);
  const { data, loading, noMore, fetches } = useRequest(
    async (d) => listHotCommunity(calcNextPage(d?.list.length, 10), 10),
    {
      ref,
      loadMore: true,
      isNoMore: (d) => (d ? d.list.length >= d.total : false),
    },
  );

  const mutates = Object.values(fetches).map((f) => f.mutate);

  return (
    <GridContent>
      <Card>
        <div>
          <List
            itemLayout="horizontal"
            loading={loading}
            dataSource={data?.list as Community[]}
            renderItem={(item) => (
              <List.Item
                actions={[<JoinButton id={item.id} joined={item.joined} mutates={mutates} />]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} />}
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={item.about}
                />
              </List.Item>
            )}
          />
          {noMore && <span>没有更多</span>}
        </div>
      </Card>
    </GridContent>
  );
};
