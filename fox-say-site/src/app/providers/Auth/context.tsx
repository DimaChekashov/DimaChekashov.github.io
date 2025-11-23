"use client";

import { IUser } from "@/shared/lib/types";
import { createContext } from "react";

interface AuthContextProps {
  user: IUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default AuthContext;
