import { useAuth } from "../contexts/authContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;