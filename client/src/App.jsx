import { Routes, Route, Outlet } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/Login"
import Home from "./Components/Home/Home"
import Register from "./pages/Register"
import ProtectedRoute from "./layouts/ProtectedRoute"
import DashboardLayout from "./layouts/DashboardLayout"
import MoodCharts from "./Components/Dashboard/moodCharts/MoodCharts"
import MoodCalendar from "./Components/Dashboard/moodCalendar/MoodCalendar"
import MoodTimeline from "./Components/Dashboard/MoodTimeline"
import { MoodProvider } from "./Contexts/MoodContext"
import AboutUs from "./Components/About/About"
import ContactUs from "./Components/Contact/ContactUs"
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
