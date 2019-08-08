import React from "react";
import faker from "faker";
import "./App.less";
import { Layout, Row, Col } from "antd";

import ContactList from "./components/ContactList";

const { Header, Footer, Content } = Layout;

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
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Row type="flex" justify="center">
            <Col span={16}>
              <ContactList contacts={CONTACTS} />
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
