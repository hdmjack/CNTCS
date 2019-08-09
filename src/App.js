import React from "react";
import faker from "faker";
import { Button, Icon, Input, Layout, Row, Col, Tooltip } from "antd";

// COMPONENTS
import ContactList from "./components/ContactList";

// STYLES
import styles from "./App.module.less";

const { Header, Content } = Layout;

const CONTACTS = [];

for (var i = 0; i < 20; i++)
  CONTACTS.push({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobileNumber: faker.phone.phoneNumber(),
    homeNumber: faker.phone.phoneNumber(),
    workNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    imageUrl: faker.image.imageUrl(null, null, "people", true)
  });

function App() {
  const deleteContact = () => {};
  const addContact = () => {};

  const [filteredContacts, setFilteredContacts] = React.useState(CONTACTS);
  const [search, setSearch] = React.useState("");

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
                    onClick={addContact}
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
    </Layout>
  );
}

export default App;
