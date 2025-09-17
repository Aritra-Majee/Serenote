import { useAuth } from "../Contexts/authContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Navbar() {


  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); 
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: "#9f8082" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ fontFamily: 'Pacifico' }} to="/">Serenote</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => (
                isActive ? "nav-link text-danger" : "nav-link"
              )} to="/">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => (
                isActive ? "nav-link text-danger" : "nav-link"
              )} to="/about">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => (
                isActive ? "nav-link text-danger" : "nav-link"
              )} to="/contact">Contact-Us</NavLink>
            </li>
          </ul>

          <div className="d-flex">
            {user ?
              <>
                <span className="navbar-text me-3">Welcome, {user.username || "User"}</span>
                <NavLink to="/dashboard" className="btn btn-outline-dark me-2">Dashbord</NavLink>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
              </>
              :
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-outline-success">Register</Link>
              </>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
