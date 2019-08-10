import Request from "./request";

const request = new Request("https://apiendpoint/contacts/");

// Get the full contact list
// GET https://apiendpoint/contacts/
export const getContacts = () => request.get();

// Add a new contact, returns the full, updated contact list
// PUSH https://apiendpoint/contacts/
export const addContact = newContact => request.push(newContact);

// Update a single contact
// PUT https://apiendpoint/contacts/{id}/
export const updateContact = updatedContact =>
  request.patch(updatedContact.id, updatedContact);

// Delete a contact
// DELETE https://apiendpoint/contacts/{id}/
export const deleteContact = id => request.delete(id);
