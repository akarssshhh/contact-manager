# Contact Manager

A beginner-friendly Contact Manager application built using **React.js** for the frontend and **Node.js + Express.js** for the backend.

The project demonstrates CRUD operations, REST APIs, React Router, form validation, state management, and communication between frontend and backend.

---

## Features

- View all contacts
- View contact details
- Add a new contact
- Edit an existing contact
- Delete a contact
- Confirm before deleting
- Mark/unmark contacts as favorite
- Form validation using Regex
- React Router navigation
- REST API communication using `fetch()`
- Persistent data using `contacts.json`
- React frontend + Express backend architecture

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- JavaScript
- Tailwind CSS
- Fetch API

### Backend

- Node.js
- Express.js
- CORS
- File System (`fs`)
- JSON file storage

---

## Project Structure

```text
contact-manager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ContactCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ContactList.jsx
│   │   │   ├── ContactDetail.jsx
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── contacts.json
│   └── package.json
│
└── README.md
