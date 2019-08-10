import React from "react";
import faker from "faker";
import { Button, Icon, Input, Layout, Row, Col, Tooltip } from "antd";

// COMPONENTS
import ContactList from "./components/ContactList";
import AddContactModal from "./components/AddContactModal";

// STYLES
import styles from "./App.module.less";

const { Header, Content } = Layout;

let CONTACTS = [];

for (var i = 0; i < 20; i++)
  CONTACTS.push({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle(),
    mobileNumber: faker.phone.phoneNumber(),
    homeNumber: faker.phone.phoneNumber(),
    workNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    imageUrl: faker.image.imageUrl(null, null, "people", true)
  });

function App() {
  const deleteContact = () => {};
  const addContact = newContact => {
    CONTACTS = [newContact, ...CONTACTS];
  };

  const [filteredContacts, setFilteredContacts] = React.useState(CONTACTS);
  const [search, setSearch] = React.useState("");
  const [modalIsShown, setModalIsShown] = React.useState(false);

  const showModal = () => setModalIsShown(true);
  const hideModal = () => setModalIsShown(false);
  const onAdd = newContact => {
    addContact(newContact);
    hideModal();
  };

  const filterContacts = React.useCallback(
    event => {
      const { value } = event.currentTarget;

      setSearch(value);

      const contacts = CONTACTS.filter(
        contact =>
          contact.firstName.toLowerCase().includes(value) ||
          contact.lastName.toLowerCase().includes(value) ||
          contact.email.toLowerCase().includes(value)
      );

      setFilteredContacts(contacts);
    },
    [CONTACTS, setFilteredContacts]
  );

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
                  onChange={filterContacts}
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
                contacts={filteredContacts}
                deleteContact={deleteContact}
              />
            </Row>
          </Col>
        </Row>
      </Content>
      <AddContactModal
        visible={modalIsShown}
        onCancel={hideModal}
        onAdd={onAdd}
      />
    </Layout>
  );
}

export default App;
