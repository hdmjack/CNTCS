import React from "react";
import faker from "faker";
import styles from "./App.module.less";
import { Button, Layout, Row, Col, Tooltip } from "antd";

import ContactList from "./components/ContactList";

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

console.log(CONTACTS);

function App() {
  const deleteContact = () => {};
  const addContact = () => {};

  return (
    <Layout className={styles.app}>
      <Header>
        <Row type="flex" justify="center">
          <Col span={18}>
            <h1>Contacts</h1>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row type="flex" justify="center">
          <Tooltip title="Add a contact">
            <Button
              className={styles.addContactButton}
              type="link"
              icon="plus-square"
              onClick={addContact}
              size="large"
            />
          </Tooltip>
        </Row>
        <Row type="flex" justify="center">
          <Col span={16}>
            <ContactList contacts={CONTACTS} deleteContact={deleteContact} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
