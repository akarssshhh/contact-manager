import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ContactList from "./pages/ContactList";
import ContactDetail from "./pages/Contactdetail";
import ContactForm from "./pages/ContactForm";

const API_URL = "http://127.0.0.1:5000/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  // Get contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();

        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // M3 - Add Contact
  const addContact = async (newContact) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      const contactWithId = await response.json();

      setContacts((previousContacts) => [
        ...previousContacts,
        contactWithId,
      ]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // M4 - Update Contact
  const updateContact = async (updatedContact) => {
    try {
      const response = await fetch(
        `${API_URL}/${updatedContact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      const savedContact = await response.json();

      setContacts((previousContacts) =>
        previousContacts.map((contact) =>
          contact.id === savedContact.id
            ? savedContact
            : contact
        )
      );
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // M4 - Delete Contact
  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      setContacts((previousContacts) =>
        previousContacts.filter(
          (contact) => contact.id !== id
        )
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // M5 Bonus - Toggle Favorite
  const toggleFavorite = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}/favorite`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      const updatedContact = await response.json();

      setContacts((previousContacts) =>
        previousContacts.map((contact) =>
          contact.id === updatedContact.id
            ? updatedContact
            : contact
        )
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
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
            <ContactDetail
              contacts={contacts}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;