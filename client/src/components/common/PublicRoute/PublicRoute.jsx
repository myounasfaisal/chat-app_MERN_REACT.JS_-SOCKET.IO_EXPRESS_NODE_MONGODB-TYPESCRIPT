import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/Auth/useAuthStore";

const PublicRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  return authUser ? <Navigate to="/" /> : children;
};

export default PublicRoute;
