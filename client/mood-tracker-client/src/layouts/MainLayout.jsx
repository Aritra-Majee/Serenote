import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import Footer from "../components/Footer/Footer";

function MainLayout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;