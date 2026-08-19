import { Link } from "react-router-dom";

const ContactCard = ({
  contact,
  onDelete,
  onToggleFavorite,
}) => {
  // M4 - Ask before deleting

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmed) {
      onDelete(contact.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-3">
          {contact.name}
        </h2>

        {/* M5 Bonus - Favorite star */}

        <button
          onClick={() => onToggleFavorite(contact.id)}
          className="text-2xl"
          title="Toggle favorite"
        >
          {contact.favorite ? "★" : "☆"}
        </button>
      </div>

      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <p>City: {contact.city}</p>

      <div className="flex gap-3 mt-5">
        {/* M5 - View contact details */}

        <Link
          to={`/contact/${contact.id}`}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          View
        </Link>

        {/* M4 - Edit contact */}

        <Link
          to={`/edit/${contact.id}`}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Edit
        </Link>

        {/* M4 - Delete contact */}

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;