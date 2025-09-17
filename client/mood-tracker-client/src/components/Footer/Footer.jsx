import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top footer"
    >
      {/* Left Side - Company Text */}
      <p className="col-md-4 mb-0 px-4 text-muted">© 2025 Serenote</p>

      {/* Center - Brand Name
      <div className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0">
        <span className="fw-bold fs-5 text-muted">Mood Tracker</span>
      </div> */}

      {/* Right Side - Nav Links */}
      <ul className="nav col-md-4 justify-content-end px-4">
        <li className="nav-item">
          <Link to="/" className="nav-link px-2 text-muted">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link px-2 text-muted">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link px-2 text-muted">
            Contact Us
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
