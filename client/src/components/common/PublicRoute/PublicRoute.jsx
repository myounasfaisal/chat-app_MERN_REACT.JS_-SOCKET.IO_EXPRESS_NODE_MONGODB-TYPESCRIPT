import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../store/Auth/useAuthStore";

const PublicRoute = ({ children }) => {
  const { authUser, isCheckingAuth, isUserLoggedIn } = useAuthStore();

  if (isCheckingAuth) return null;

  // If user is logged in, redirect to chat or dashboard
  return authUser && isUserLoggedIn ? <Navigate to="/" /> : children;
};


export default PublicRoute;
