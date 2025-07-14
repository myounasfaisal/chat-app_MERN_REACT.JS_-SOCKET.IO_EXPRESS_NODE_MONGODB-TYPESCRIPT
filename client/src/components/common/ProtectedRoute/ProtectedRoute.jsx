import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/Auth/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth,isUserLoggedIn } = useAuthStore();

  if (isCheckingAuth) return null; 

  return authUser && isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
