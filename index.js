const mod = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      mod.listContacts();
      break;

    case "get":
      mod.getContactById(id);
      break;

    case "add":
      mod.addContact(name, email, phone);
      break;

    case "remove":
      mod.removeContact(id);
      break;

    default:
      console.warn("There is no such action");
  }
}

invokeAction(argv);
