import { useState } from "react";
import ContactCard from "../components/ContactCard";

const ContactList = ({
  contacts,
  onDelete,
  onToggleFavorite,
}) => {
  // M5 - Store text typed in the search box
  const [searchText, setSearchText] = useState("");

  // M5 Bonus - Store favorite-filter status
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // M5 - Search by name or email
  // M5 Bonus - Show only favorite contacts when selected
  const filteredContacts = contacts.filter((contact) => {
    let searchMatches;

    if (
      contact.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    ) {
      searchMatches = true;
    } else if (
      contact.email
        .toLowerCase()
        .includes(searchText.toLowerCase())
    ) {
      searchMatches = true;
    } else {
      searchMatches = false;
    }

    let favoriteMatches;

    if (showFavoritesOnly) {
      favoriteMatches = contact.favorite;
    } else {
      favoriteMatches = true;
    }

    return searchMatches && favoriteMatches;
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Contact List
      </h1>

      {/* M5 - Search box */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full border p-3 rounded mb-4"
      />

      {/* M5 Bonus - Favorite filter button */}
      <button
        onClick={() =>
          setShowFavoritesOnly(!showFavoritesOnly)
        }
        className="mb-6 bg-yellow-400 text-black px-4 py-2 rounded"
      >
        {showFavoritesOnly
          ? "Show All Contacts"
          : "Show Favorites Only"}
      </button>

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
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;