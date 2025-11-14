import { Link } from "react-router-dom";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <nav className="flex justify-between mb-6">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          Home
        </Link>
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Admin Login
        </Link>
      </nav>

      <AppRoutes /> {/* ✅ now using separate route file */}
    </div>
  );
}

export default App;
