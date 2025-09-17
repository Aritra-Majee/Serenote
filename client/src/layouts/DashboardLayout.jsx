import Dashboard from "../components/dashboard/Dashboard";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <>
            <Dashboard />
            <Outlet />
        </>
    );
}

export default DashboardLayout;