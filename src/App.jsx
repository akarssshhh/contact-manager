import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/Contactdetail";
import ContactForm from "./pages/ContactForm";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Aarav Shah",
      email: "aarav@mail.com",
      phone: "9876543210",
      city: "Pune",
      favorite: false,
    },
    {
      id: 2,
      name: "Riya Sharma",
      email: "riya@mail.com",
      phone: "9876543211",
      city: "Mumbai",
      favorite: true,
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@mail.com",
      phone: "9876543212",
      city: "Delhi",
      favorite: false,
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha@mail.com",
      phone: "9876543213",
      city: "Ahmedabad",
      favorite: false,
    },
  ]);

  // M3 - Add Contact

  const addContact = (newContact) => {
    const contactWithId = {
      ...newContact,
      id: Date.now(),
      favorite: false,
    };

    setContacts((previousContacts) => [
      ...previousContacts,
      contactWithId,
    ]);
  };

  // M4 - Update Contact

  const updateContact = (updatedContact) => {
    setContacts((previousContacts) =>
      previousContacts.map((contact) =>
        contact.id === updatedContact.id
          ? { ...contact, ...updatedContact }
          : contact
      )
    );
  };

  // M4 - Delete Contact

  const deleteContact = (id) => {
    setContacts((previousContacts) =>
      previousContacts.filter(
        (contact) => contact.id !== id
      )
    );
  };

  // M5 Bonus - Add or remove favorite status

  const toggleFavorite = (id) => {
    setContacts((previousContacts) =>
      previousContacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              favorite: !contact.favorite,
            }
          : contact
      )
    );
  };

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}

        <Route
          path="/"
          element={
            <ContactList
              contacts={contacts}
              onDelete={deleteContact}
              onToggleFavorite={toggleFavorite}
            />
          }
        />

        {/* M3 - Add Contact */}

        <Route
          path="/add"
          element={
            <ContactForm
              onAdd={addContact}
            />
          }
        />

        {/* M4 - Edit Contact */}

        <Route
          path="/edit/:id"
          element={
            <ContactForm
              contacts={contacts}
              onUpdate={updateContact}
            />
          }
        />

        {/* M5 - Contact Detail Page */}

        <Route
          path="/contact/:id"
          element={
            <ContactDetail contacts={contacts} />
          }
        />
      </Routes>
    </>
  );
}

export default App;