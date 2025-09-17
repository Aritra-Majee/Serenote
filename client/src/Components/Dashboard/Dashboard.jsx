
import { Link, NavLink } from "react-router-dom";
import "./Dashboard.css";
import MoodForm from "./MoodForm";


const apiUrl = import.meta.env.VITE_API_URL;



function Dashboard() {
    
    return <>


        <MoodForm />

        <nav className="navbar navbar-expand-lg dashboard-navbar">
            <div className="container-fluid">
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
                            <NavLink end className="nav-link" to="/dashboard">Mood Analytics</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/timeline">Mood Timeline</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/calendar">Mood Calendar</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>




    </>
}
export default Dashboard;