import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav>
      <div className="nav-content">
        <div className="logo">TodoApp</div>
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
            Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;