import React from "react";
import { Modal, Row } from "antd";

// COMPONENTS
import ContactForm from "./ContactForm";

// STYLES
import styles from "./AddContactModal.module.less";

const createEmptyContact = () => ({
  firstName: "",
  lastName: "",
  jobTitle: "",
  mobileNumber: "",
  homeNumber: "",
  workNumber: "",
  email: "",
  imageUrl: ""
});

const AddContactModal = ({ visible, cancelAddContact, addContact }) => {
  const [contact, setContact] = React.useState(createEmptyContact());

  return (
    <Modal
      className={styles.addContactModal}
      title="Add a New Contact"
      visible={visible}
      onOk={addContact}
      onCancel={cancelAddContact}
    >
      <Row>
        <ContactForm contact={contact} updateContact={setContact} />
      </Row>
    </Modal>
  );
};

export default AddContactModal;
