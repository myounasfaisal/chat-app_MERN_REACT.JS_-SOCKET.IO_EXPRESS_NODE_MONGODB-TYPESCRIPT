import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/Auth/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null; 

  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
