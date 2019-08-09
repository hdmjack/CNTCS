import React from "react";
import {
  Avatar,
  Button,
  Col,
  Collapse,
  Icon,
  List,
  Popconfirm,
  Tooltip,
  Result,
  Row,
  Input,
  Form
} from "antd";

// STYLES
import styles from "./ContactList.module.less";

const { Panel } = Collapse;

const ContactList = ({ contacts, deleteContact }) => {
  return contacts.length ? (
    <List
      dataSource={contacts}
      renderItem={(contact, index) => (
        <ContactListItem
          contact={contact}
          deleteContact={deleteContact}
          index={index}
        />
      )}
    />
  ) : (
    <Result
      className={styles.noResults}
      icon={<Icon type="frown" />}
      title="No matches found."
    />
  );
};

const ContactListItem = ({ contact, deleteContact, index }) => {
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
          <Form layout="inline">
            <Row>
              <ContactFormItem
                contact={contact}
                fieldName="firstName"
                label="First Name"
                index={index}
              />
              <Col span={12}>
                <Form.Item label="Last Name">
                  <Input value={contact.lastName} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Mobile Number">
                  <Input value={contact.mobileNumber} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Home Number">
                  <Input value={contact.homeNumber} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="Work Number">
                  <Input value={contact.workNumber} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input value={contact.email} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Panel>
      </Collapse>
    </List.Item>
  );
};

const ContactListItemHeader = ({ contact, deleteContact, showDetails }) => {
  // Required to stop misfires on the parent component
  const doNothing = e => {
    e.stopPropagation();
  };

  const confirmDelete = e => {
    e.stopPropagation();
    deleteContact(contact.id);
  };

  return (
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
        onCancel={doNothing}
        onConfirm={confirmDelete}
        onClick={doNothing}
      >
        <Tooltip placement="left" title="Delete contact">
          <Button type="link" icon="delete" />
        </Tooltip>
      </Popconfirm>
    </React.Fragment>
  );
};

const ContactFormItem = ({ contact, fieldName, label, index }) => {
  const inputRef = React.useRef();
  const [inputShown, setInputShown] = React.useState(false);

  const hideInput = () => setInputShown(false);
  const showInput = () => {
    setInputShown(true);
  };

  React.useEffect(() => {
    inputShown && inputRef.current.focus();
  }, [inputShown]);

  const fieldValue = contact[fieldName];
  const hasValue = fieldValue !== "";
  const displayValue = hasValue ? fieldValue : "Click to edit...";

  return (
    <Col span={12}>
      <Form.Item label={label}>
        {inputShown ? (
          <Input
            ref={inputRef}
            name={`${index}.${fieldName}`}
            value={fieldValue}
            onBlur={hideInput}
          />
        ) : (
          <span onClick={showInput} className={styles.displayValueWrapper}>
            <span className={hasValue ? "" : "noValue"}>{displayValue}</span>
            <Icon type="edit" />
          </span>
        )}
      </Form.Item>
    </Col>
  );
};

export default ContactList;
