import React from "react";
import { Avatar, List, Skeleton, Icon } from "antd";

const ContactList = ({ contacts }) => {
  return (
    <List
      className="demo-loadmore-list"
      //   loading={initLoading}
      itemLayout="horizontal"
      //   loadMore={loadMore}
      dataSource={contacts}
      renderItem={contact => (
        <List.Item
          itemLayout="vertical"
          size="large"
          actions={[<Icon type="delete" />, <a>more</a>]}
        >
          <Skeleton avatar title={false} loading={contact.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={contact.imageUrl} />}
              title={`${contact.firstName} ${contact.lastName}`}
              description={
                <span>
                  <strong>Mobile: </strong>
                  {contact.mobileNumber}
                  &nbsp;&nbsp;
                  <strong>Email: </strong>
                  {contact.email}
                </span>
              }
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default ContactList;
