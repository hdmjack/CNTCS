import React from "react";
import {
  Avatar,
  Button,
  Collapse,
  Icon,
  List,
  Popconfirm,
  Tooltip,
  Result
} from "antd";

// COMPONENTS
import ContactForm from "./ContactForm";

// STYLES
import styles from "./ContactList.module.less";

const { Panel } = Collapse;

const ContactList = ({
  contacts,
  loading,
  deleteContact,
  updateContact,
  saveContact
}) => {
  if (contacts.length) {
    return (
      <List
        dataSource={contacts}
        renderItem={(contact, index) => (
          <ContactListItem
            contact={contact}
            deleteContact={deleteContact}
            updateContact={updateContact}
            saveContact={saveContact}
            index={index}
          />
        )}
      />
    );
  }

  if (loading) {
    return (
      <Result className={styles.noResults} icon={<Icon type="ellipsis" />} />
    );
  }

  return (
    <Result
      className={styles.noResults}
      icon={<Icon type="frown" />}
      title="No matches found."
    />
  );
};

const ContactListItem = ({
  contact,
  deleteContact,
  updateContact,
  saveContact,
  index
}) => {
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
          <ContactForm
            contact={contact}
            updateContact={updateContact}
            saveContact={saveContact}
            index={index}
          />
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

export default ContactList;
