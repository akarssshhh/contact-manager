/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const contactsFile = path.join(__dirname, "contacts.json");

// Read contacts from contacts.json
const getContacts = () => {
  const data = fs.readFileSync(contactsFile, "utf-8");
  return JSON.parse(data);
};

// Save contacts to contacts.json
const saveContacts = (contacts) => {
  fs.writeFileSync(
    contactsFile,
    JSON.stringify(contacts, null, 2)
  );
};

// GET all contacts
app.get("/api/contacts", (req, res) => {
  const contacts = getContacts();

  res.json(contacts);
});

// GET one contact
app.get("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  console.log("ID received from URL:", id);

  const contacts = getContacts();

  const contact = contacts.find(
    (contact) => contact.id === Number(id)
  );

  if (!contact) {
    return res.status(404).json({
      message: "Contact not found",
    });
  }

  res.json(contact);
});

// CREATE contact
app.post("/api/contacts", (req, res) => {
  const contacts = getContacts();

  const newContact = {
    id: contacts.length > 0
        ? Math.max(...contacts.map((contact) => contact.id)) + 1
        : 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    favorite: false,
  };

  contacts.push(newContact);

  saveContacts(contacts);

  res.status(201).json(newContact);
});

// UPDATE contact
app.put("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  const contacts = getContacts();

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === Number(id)
  );

  if (contactIndex === -1) {
    return res.status(404).json({
      message: "Contact not found",
    });
  }

  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...req.body,
    id: Number(id),
  };

  saveContacts(contacts);

  res.json(contacts[contactIndex]);
});

// DELETE contact
app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;

  const contacts = getContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== Number(id)
  );

  if (updatedContacts.length === contacts.length) {
    return res.status(404).json({
      message: "Contact not found",
    });
  }

  saveContacts(updatedContacts);

  res.json({
    message: "Contact deleted successfully",
  });
});

// TOGGLE favorite
app.patch("/api/contacts/:id/favorite", (req, res) => {
  const { id } = req.params;

  const contacts = getContacts();

  const contact = contacts.find(
    (contact) => contact.id === Number(id)
  );

  if (!contact) {
    return res.status(404).json({
      message: "Contact not found",
    });
  }

  contact.favorite = !contact.favorite;

  saveContacts(contacts);

  res.json(contact);
});

// Start server
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});d