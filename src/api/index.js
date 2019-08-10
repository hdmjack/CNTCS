import Request from "./request";

const request = new Request("https://apiendpoint/contacts/");

// Get the full contact list
export const getContacts = () => request.get();

// Add a new contact, returns the full, updated contact list
export const addContact = newContact => request.push(newContact);

// Update a single contact
export const updateContact = updatedContact =>
  request.patch(updatedContact.id, updatedContact);

// Delete a contact
export const deleteContact = id => request.delete(id);
