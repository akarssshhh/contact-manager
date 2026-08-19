import { Link } from "react-router-dom";

const Contactcard = ({ contact, onDelete }) => {

  const handleDelete = () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmed) {
      onDelete(contact.id);
    }
  };


  return (
    <div className="border p-5 rounded-lg shadow-sm mb-4">

      <h2 className="text-xl font-bold">
        {contact.name}
      </h2>

      <p>
        Email: {contact.email}
      </p>

      <p>
        Phone: {contact.phone}
      </p>

      <p>
        City: {contact.city}
      </p>


      <div className="flex gap-3 mt-4">

        {/* View */}

        <Link
          to={`/contact/${contact.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View
        </Link>


        {/* Edit */}

        <Link
          to={`/edit/${contact.id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>


        {/* Delete */}

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default Contactcard;