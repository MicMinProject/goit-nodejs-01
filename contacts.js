const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data.toString())))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const array = JSON.parse(data.toString());
      console.table(
        array.filter((item) => Number(contactId) === Number(item.id)),
      );
    })
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const array = JSON.parse(data.toString());
      fs.writeFile(
        contactsPath,
        JSON.stringify(
          array.filter((item) => Number(contactId) !== Number(item.id)),
        ),
      )
        .then(() => listContacts())
        .catch((error) => console.log(error.message));
    })
    .catch((error) => console.log(error.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const array = JSON.parse(data.toString());
      let newId = 0;
      array.map((item) => {
        if (Number(item.id) > newId) {
          newId = Number(item.id);
        }
      });
      fs.writeFile(
        contactsPath,
        JSON.stringify([
          ...array,
          {
            id: (newId + 1).toString(),
            name: name,
            email: email,
            phone: phone,
          },
        ]),
      )
        .then(() => listContacts())
        .catch((error) => console.log(error.message));
    })
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
