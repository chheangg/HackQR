import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "@tanstack/react-router";

export function RequiredAuth({ children }: { children:JSX.Element }) {
  const { currentUser, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) {
    return 'loading';
  }

  if (!currentUser) {
    // Redirect the user to the home page.
    // Please! Close the mustache {{}}
    navigate({ to: '/login' });
  }

  return children;
};