import React from "react";
import { List, Skeleton } from "antd";

const ContactList = ({ contacts }) => {
  return (
    <List
      className="demo-loadmore-list"
      //   loading={initLoading}
      itemLayout="horizontal"
      //   loadMore={loadMore}
      dataSource={contacts}
      renderItem={contact => (
        <List.Item actions={[<a>edit</a>, <a>more</a>]}>
          <Skeleton avatar title={false} loading={contact.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{contact.name.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default ContactList;
