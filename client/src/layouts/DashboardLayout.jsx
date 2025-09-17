import Dashboard from "../Components/Dashboard/Dashboard";
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