import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm = ({
  onAdd,
  contacts = [],
  onUpdate,
}) => {

  const navigate = useNavigate();

  const { id } = useParams();

  const isEditMode = Boolean(id);


  // Find the contact we want to edit

  const contactToEdit = contacts.find(
    (contact) => contact.id === Number(id)
  );


  const [formData, setFormData] = useState({
    name: contactToEdit?.name || "",
    email: contactToEdit?.email || "",
    phone: contactToEdit?.phone || "",
    city: contactToEdit?.city || "",
  });


  const [errors, setErrors] = useState({});


  // Regex

  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9][0-9]{9}$/;
  const cityRegex = /^[A-Za-z ]+$/;


  // Handle input changes

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  // Validate form

  const validateForm = () => {

    const newErrors = {};


    // Name validation

    if (!formData.name.trim()) {

      newErrors.name = "Name is required";

    } else if (!nameRegex.test(formData.name)) {

      newErrors.name = "Name should contain only letters";
    }


    // Email validation

    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    } else if (!emailRegex.test(formData.email)) {

      newErrors.email = "Enter a valid email";
    }


    // Phone validation

    if (!formData.phone.trim()) {

      newErrors.phone = "Phone number is required";

    } else if (!phoneRegex.test(formData.phone)) {

      newErrors.phone = "Phone number must start with {6-9} and contain exactly 10 digits";
    }


    // City validation

    if (!formData.city.trim()) {

      newErrors.city = "City is required";

    } else if (!cityRegex.test(formData.city)) {

      newErrors.city = "City should contain only letters";
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // Submit form

  const handleSubmit = (e) => {

    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }


    // Edit existing contact

    if (isEditMode) {

      onUpdate({
        ...formData,
        id: Number(id),
      });

    }

    // Add new contact

    else {

      onAdd(formData);
    }


    navigate("/");
  };


  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">

      <h1 className="text-2xl font-bold mb-6">

        {isEditMode
          ? "Edit Contact"
          : "Add Contact"
        }

      </h1>


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        {/* Name */}

        <div>

          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {errors.name && (

            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>

          )}

        </div>


        {/* Email */}

        <div>

          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="text"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {errors.email && (

            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>

          )}

        </div>


        {/* Phone */}

        <div>

          <label className="block mb-1 font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {errors.phone && (

            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>

          )}

        </div>


        {/* City */}

        <div>

          <label className="block mb-1 font-medium">
            City
          </label>

          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {errors.city && (

            <p className="text-red-500 text-sm mt-1">
              {errors.city}
            </p>

          )}

        </div>


        {/* Submit */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >

          {isEditMode
            ? "Update Contact"
            : "Add Contact"
          }

        </button>

      </form>

    </div>
  );
};

export default ContactForm;