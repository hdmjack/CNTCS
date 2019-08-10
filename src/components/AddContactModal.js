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
  address: "",
  imageUrl: ""
});

const AddContactModal = ({ visible, onAdd, onCancel }) => {
  const [contact, setContact] = React.useState(createEmptyContact());

  const handleCancel = () => {
    setContact(createEmptyContact());
    onCancel();
  };

  const handleUpdateContact = ({ currentTarget }) => {
    const updatedContact = {
      ...contact,
      [currentTarget.name]: currentTarget.value
    };

    setContact(updatedContact);
  };

  const handleOk = async () => {
    await onAdd({ ...contact });
    setContact(createEmptyContact());
  };

  return (
    <Modal
      className={styles.addContactModal}
      title="Add a New Contact"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row>
        <ContactForm contact={contact} updateContact={handleUpdateContact} />
      </Row>
    </Modal>
  );
};

export default AddContactModal;
