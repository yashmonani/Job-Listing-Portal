import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import JobListingPage from "./Pages/JobListingPage";
import ProfilePage from "./Pages/ProfilePage";
import DashboardPage from "./Pages/Admin/DashboardPage";
import SignUp from "./Pages/auth/SignUp";
import Login from "./Pages/auth/Login";
import Browse from "./Pages/Browse";
import CompanyCreate from "./Pages/Admin/CompanyCreate";
import CompanySetup from "./Pages/Admin/CompanySetup";

function AppRouter() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobListingPage />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/dashboard/create" element={<CompanyCreate />} />
        <Route path="/admin/dashboard/:id" element={<CompanySetup />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default AppRouter;
