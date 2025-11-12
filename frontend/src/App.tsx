import { Routes, Route, Link } from "react-router-dom";
import Form from "./components/Form";
import Admin from "./components/AdminDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex justify-between mb-6">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          Home
        </Link>
        <button 
          onClick={() => window.location.href = '/admin'} 
          className="text-blue-600 font-semibold  hover: border-2 rounded cursor-pointer"
        >
          Admin Login
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
