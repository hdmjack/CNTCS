import React from "react";

import { message, Button, Icon, Input, Layout, Row, Col, Tooltip } from "antd";

// API
import { addContact, updateContact, deleteContact, getContacts } from "./api";

// COMPONENTS
import ContactList from "./components/ContactList";
import AddContactModal from "./components/AddContactModal";

// STYLES
import styles from "./App.module.less";

const { Header, Content } = Layout;

function App() {
  // STATE
  const [contacts, setContacts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [modalIsShown, setModalIsShown] = React.useState(false);

  // EFFECTS
  React.useEffect(() => {
    const fetchContacts = async () => {
      const hide = message.loading("Getting contacts...", 0);

      const newContacts = await getContacts();

      hide();
      setContacts(newContacts);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  // HANDLERS
  const showModal = () => setModalIsShown(true);
  const hideModal = () => setModalIsShown(false);

  const handleAdd = async newContact => {
    setLoading(true);
    const hide = message.loading("Creating contact...", 0);
    hideModal();

    const newContacts = await addContact(newContact);

    setContacts(newContacts);
    hide();
    setSearch("");
  };

  const handleFilterChange = ({ currentTarget }) => {
    const { value } = currentTarget;
    setSearch(value);
  };

  const handleUpdateContact = ({ currentTarget }) => {
    const [index, fieldName] = currentTarget.name.split(".");
    const newContacts = [...contacts];

    newContacts[index] = {
      ...contacts[index],
      [fieldName]: currentTarget.value
    };

    setContacts(newContacts);
  };

  const handleDelete = async index => {
    setLoading(true);
    const hide = message.loading("Saving changes...", 0);
    const newContacts = [...contacts];

    const contactToDelete = newContacts.splice(index, 1);

    setContacts(newContacts);

    await updateContact(contactToDelete);

    hide();
    setLoading(false);
  };

  const handleSaveContact = async index => {
    setLoading(true);
    const hide = message.loading("Saving changes...", 0);

    const contactToSave = contacts[index];
    await updateContact(contactToSave);

    hide();
    setLoading(false);
  };

  // CALLBACKS
  const getFilteredContacts = React.useCallback(() => {
    const filteredContacts = contacts.filter(
      contact =>
        contact.firstName.toLowerCase().includes(search) ||
        contact.lastName.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search)
    );

    return filteredContacts;
  }, [search, contacts]);

  return (
    <Layout className={styles.app}>
      <Header>
        <Row type="flex" justify="center">
          <Col span={16}>
            <h1>CNTCS</h1>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row type="flex" justify="center">
          <Col span={16}>
            <Row>
              <Col span={6}>
                <Input
                  prefix={<Icon type="search" />}
                  placeholder="Search..."
                  onChange={handleFilterChange}
                  value={search}
                />
              </Col>
              <Col className={styles.addContactWrapper} span={2} push={5}>
                <Tooltip title="Add a contact">
                  <Button
                    type="link"
                    icon="plus-square"
                    onClick={showModal}
                    size="large"
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row>
              <ContactList
                loading={loading}
                contacts={getFilteredContacts()}
                deleteContact={handleDelete}
                updateContact={handleUpdateContact}
                saveContact={handleSaveContact}
              />
            </Row>
          </Col>
        </Row>
      </Content>
      <AddContactModal
        visible={modalIsShown}
        onCancel={hideModal}
        onAdd={handleAdd}
        loading={loading}
      />
    </Layout>
  );
}

export default App;
