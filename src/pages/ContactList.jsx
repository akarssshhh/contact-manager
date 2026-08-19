import { useState } from "react";
import ContactCard from "../components/ContactCard";

const ContactList = ({ contacts, onDelete }) => {
  // M5 - Store search text

  const [searchText, setSearchText] = useState("");

  // M5 - Filter contacts using name or email

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      contact.email
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Contact List
      </h1>

      {/* M5 - Search Input */}

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full border p-3 rounded mb-6"
      />

      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : filteredContacts.length === 0 ? (
        <p>No matching contacts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;