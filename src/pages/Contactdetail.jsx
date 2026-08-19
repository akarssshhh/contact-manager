import { Link, useParams } from "react-router-dom";

const ContactDetail = ({ contacts }) => {
  // M5 - Get ID from URL

  const { id } = useParams();

  // M5 - Find selected contact

  const contact = contacts.find(
    (contact) => contact.id === Number(id)
  );

  // M5 - Handle wrong contact ID

  if (!contact) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">
          Contact not found
        </h2>

        <Link
          to="/"
          className="inline-block mt-4 text-blue-600"
        >
          Back to Contact List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Contact Details
      </h1>

      <p className="mb-3">
        <span className="font-bold">Name:</span>{" "}
        {contact.name}
      </p>

      <p className="mb-3">
        <span className="font-bold">Email:</span>{" "}
        {contact.email}
      </p>

      <p className="mb-3">
        <span className="font-bold">Phone:</span>{" "}
        {contact.phone}
      </p>

      <p className="mb-3">
        <span className="font-bold">City:</span>{" "}
        {contact.city}
      </p>

      {/* M5 Bonus - Show favorite status */}

      <p className="mb-5">
        <span className="font-bold">Favorite:</span>{" "}
        {contact.favorite ? "Yes ★" : "No ☆"}
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Contact List
      </Link>
    </div>
  );
};

export default ContactDetail;