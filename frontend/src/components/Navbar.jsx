import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      
      {/* Center Title */}
      <h1 className="nav-title">TodoApp</h1>

      {/* Navigation buttons */}
      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/add"
          className={location.pathname === "/add" ? "active" : ""}
        >
          + Add Task
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
