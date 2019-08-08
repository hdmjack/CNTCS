import React from "react";
import faker from "faker";
import "./App.less";
import { Layout } from "antd";

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
    imageUrl: faker.image.imageUrl(null, null, "people", true)
  });

console.log(CONTACTS);

function App() {
  return (
    <div>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
