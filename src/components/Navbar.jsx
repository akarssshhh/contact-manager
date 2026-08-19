import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-row items-center justify-between">
        
        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          Contact Manager
        </Link>

        <div className="flex flex-row items-center gap-6">
          <Link
            to="/"
            className="text-white font-medium hover:text-blue-200"
          >
            Home
          </Link>

          <Link
            to="/add"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50"
          >
            Add Contact
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;