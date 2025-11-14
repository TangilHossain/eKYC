import { Routes, Route } from "react-router-dom";
import Form from "../components/Form";
import AdminDashboard from "../components/AdminDashboard";
import AdminLoginPage from "../components/AdminLoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
