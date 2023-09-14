const contacts = require("./contacts");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      try {
        const contactsList = await contacts.listContacts();
        console.table(contactsList);
      } catch (err) {
        console.log(err.message);
      }
      break;

    case "get":
      try {
        const contactItem = await contacts.getContactById(id);
        console.table(contactItem);
      } catch (err) {
        console.log(err.message);
      }
      break;

    case "add":
      try {
        const newContact = await contacts.addContact({
          name,
          email,
          phone,
        });
        console.table(newContact);
      } catch (err) {
        console.log(err.message);
      }
      break;

    case "remove":
      try {
        const removedContact = await contacts.removeContact(id);
        console.table(removedContact);
      } catch (err) {
        console.log(err.message);
      }
      break;

    default:
      console.warn("Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();
console.log(options);
invokeAction(options);
