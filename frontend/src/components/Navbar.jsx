import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222" }}>
      <Link to="/" style={{ color: "white", marginRight: "10px" }}>
        Home
      </Link>
      <Link to="/add" style={{ color: "white" }}>
        Add Todo
      </Link>
    </nav>
  );
}

export default Navbar;
