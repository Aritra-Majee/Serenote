import { Routes, Route, Outlet } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/Login"
import Home from "./components/home/Home"
import Register from "./pages/Register"
import ProtectedRoute from "./layouts/ProtectedRoute"
import DashboardLayout from "./layouts/DashboardLayout"
import MoodCharts from "./components/dashboard/moodCharts/MoodCharts"
import MoodCalendar from "./components/dashboard/moodCalendar/MoodCalendar"
import MoodTimeline from "./components/dashboard/MoodTimeline"
import { MoodProvider } from "./contexts/MoodContext"
import AboutUs from "./components/about/About"
import ContactUs from "./components/contact/ContactUs"
import { Toaster } from "react-hot-toast";


function App() {

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route element={<ProtectedRoute />}>
            <Route element={
              <MoodProvider>
                <DashboardLayout />
              </MoodProvider>}>


              <Route path="/dashboard" element={<MoodCharts />} />
              <Route path="/dashboard/calendar" element={<MoodCalendar />} />
              <Route path="/dashboard/timeline" element={<MoodTimeline />} />
            </Route>


          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


      </Routes>

      <Toaster />
    </>
  )
}

export default App
