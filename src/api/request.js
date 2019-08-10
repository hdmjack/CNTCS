// Fake API provider
import faker from "faker";

const generateContacts = () => {
  const contacts = [];

  const count = faker.random.number({ min: 5, max: 25 });

  for (var i = 0; i < count; i++) {
    contacts.push({
      id: faker.random.uuid(),
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
  }

  return contacts;
};

const fakeFetch = () => {
  const delay = faker.random.number({ min: 10, max: 2000 });
  return new Promise(resolve => setTimeout(resolve, delay));
};

export default class Request {
  constructor(basepath) {
    this.basepath = basepath;
    this.contacts = generateContacts();
  }

  get = () => fakeFetch().then(() => Promise.resolve(this.contacts));

  push = newContact =>
    fakeFetch().then(() => {
      const contact = {
        ...newContact,
        id: faker.random.uuid()
      };

      this.contacts = [contact, ...this.contacts];

      return Promise.resolve(this.contacts);
    });

  patch = (id, contact) => fakeFetch();

  delete = (id, contact) => fakeFetch();
}
