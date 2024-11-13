/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "firebase/auth";
import { createContext, useState, useEffect, ReactNode } from "react";
import { SignOutUser, userStateListener } from "../../../lib/firebase";
import { useNavigate, useRouter } from "@tanstack/react-router";
import axios from "axios";
import { request } from "../../../lib/request";

interface Props {
  children?: ReactNode
}

export const AuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  currentUser: {} as User | null,
  setCurrentUser: (_user:User) => {},
  signOut: () => {},
  isLoading: true
});

export const AuthProvider = ({ children }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = userStateListener((user: User | null) => {
      if (user) {
        setCurrentUser(user);
        user.getIdToken().then((v) => {
          localStorage.setItem("token", v);
        });
      }

      setLoading(false);
    });
    return unsubscribe;
  }, [setCurrentUser]);

  // As soon as setting the current user to null, 
  // the user will be redirected to the home page. 
  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
  };

  const value = {
    currentUser, 
    setCurrentUser,
    signOut,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
