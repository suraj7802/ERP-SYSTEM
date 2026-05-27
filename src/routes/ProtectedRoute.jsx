/**
 * ProtectedRoute.jsx
 * Guards all dashboard routes.
 * If no token → redirect to /login (saves original path for post-login redirect)
 * If token expired → same redirect
 * Otherwise → render children
 */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/authSlice";

export default function ProtectedRoute({ children }) {
  const { token, tokenExpiry } = useSelector(selectAuth);
  const location = useLocation();

  // No token → login
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Token present but expired
  if (tokenExpiry && tokenExpiry > 0 && Date.now() > tokenExpiry) {
    return (
      <Navigate
        to="/login"
        state={{ from: location, expired: true }}
        replace
      />
    );
  }

  return children;
}
