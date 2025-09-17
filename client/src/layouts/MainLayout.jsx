import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import Footer from "../Components/Footer/Footer";

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