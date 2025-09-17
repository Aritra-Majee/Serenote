import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'


const apiUrl = import.meta.env.VITE_API_URL;

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${apiUrl}/api/users/register`,
        {
          username: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      toast.success("Registration Successfull !!");
      navigate("/login");
    }
    catch (err) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });


      const message = err.response?.data?.message || "Registration failed. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
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

          </div>
        </div>
      </nav>


      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="text-center mb-4">Register</h3>



          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              "Register"
            )}
            </button>

            <Link
              to="/login"
              className="d-block text-center mt-3 text-secondary"
            >
              Already Registered? Login
            </Link>

          </form>
        </div>
      </div>
    </>

  );
}

export default Register;
