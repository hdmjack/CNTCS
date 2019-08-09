import React from "react";
import {
  Avatar,
  Button,
  Col,
  Collapse,
  List,
  Popconfirm,
  Tooltip,
  Row
} from "antd";
import styles from "./ContactList.module.less";

const { Panel } = Collapse;

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <List
      className="demo-loadmore-list"
      dataSource={contacts}
      renderItem={contact => (
        <ContactListItem contact={contact} deleteContact={deleteContact} />
      )}
    />
  );
};

const ContactListItem = ({ contact, deleteContact }) => {
  const [isOpen, setOpen] = React.useState(false);

  const onClickOpen = () => {
    setOpen(!isOpen);
  };
  return (
    <List.Item className={styles.listItem} size="large" actions={[]}>
      <Collapse bordered={false} onChange={onClickOpen}>
        <Panel
          header={
            <ContactListItemHeader
              contact={contact}
              deleteContact={deleteContact}
              showDetails={!isOpen}
            />
          }
        >
          <Row>
            <Col span={12}>
              <strong>First Name:</strong> {contact.firstName}
            </Col>
            <Col span={12}>
              <strong>Last Name:</strong> {contact.lastName}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <strong>Mobile Number:</strong> {contact.mobileNumber}
            </Col>
            <Col span={12}>
              <strong>Home Number:</strong> {contact.homeNumber}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <strong>Work Number:</strong> {contact.workNumber}
            </Col>
            <Col span={12}>
              <strong>Email:</strong> {contact.email}
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </List.Item>
  );
};

const ContactListItemHeader = ({ contact, deleteContact, showDetails }) => (
  <React.Fragment>
    <List.Item.Meta
      avatar={<Avatar src={contact.imageUrl} />}
      title={
        showDetails ? (
          <h3>
            {contact.firstName} {contact.lastName}
          </h3>
        ) : (
          <h2>
            {contact.firstName} {contact.lastName}
          </h2>
        )
      }
      description={
        showDetails && (
          <span>
            <strong>Mobile: </strong>
            {contact.mobileNumber}
            &nbsp;&nbsp;
            <strong>Email: </strong>
            {contact.email}
          </span>
        )
      }
    />
    <Popconfirm
      title="Are you sure？"
      okText="Yes"
      cancelText="No"
      onConfirm={deleteContact}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Tooltip placement="left" title="Add a contact">
        <Button type="link" icon="delete" />
      </Tooltip>
    </Popconfirm>
  </React.Fragment>
);

export default ContactList;
