import { Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Contexts/AuthContext";
import toast from "react-hot-toast";
import Swal from 'sweetalert2'



const apiUrl = import.meta.env.VITE_API_URL;

function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/api/users/login`,
        {
          email: formData.email,
          password: formData.password
        }
      );


      login(res);

      setFormData({ email: "", password: "" });
      toast.success("Login Successfull !!");
      navigate("/dashboard");

    }
    catch (err) {
      setFormData({ email: "", password: "" });

      const message = err.response?.data?.message || "Login failed. Please try again.";

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

      <div className="d-flex justify-content-center align-items-center vh-100">
        <form
          className="p-4 border rounded shadow"
          style={{ minWidth: "300px" }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Login</h3>

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

            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="mb-4">
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

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              "Login"
            )}
          </button>

          <Link
            to="/register"
            className="d-block text-center mt-3 text-secondary"
          >
            Don't have an account? Register
          </Link>
        </form>
      </div>

    </>

  );
}

export default Login;
