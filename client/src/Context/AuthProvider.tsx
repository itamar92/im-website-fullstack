import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  useContext,
  Dispatch,
} from "react";
import { IUser } from "../interface/IUser";

interface AuthContextProps {
  auth: IUser | any;
  setAuth: (auth: IUser) => void;
  loginDialog: boolean | null;
  setLoginDialog: (loginDialog: SetStateAction<boolean>) => void;
}

type AuthContextType = {
  auth: IUser | any;
  setAuth: (auth: IUser) => void;
  loginDialog: boolean;
  setLoginDialog: Dispatch<SetStateAction<boolean>>;
};

const IAuthContextState = {
  auth: undefined,
  setAuth: () => {},
  loginDialog: true,
  setLoginDialog: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(IAuthContextState);

export function useAuthProvider() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});
  const [loginDialog, setLoginDialog] = useState<boolean>(false);

  useEffect(() => {
    console.log(auth);
    console.log(loginDialog);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loginDialog, setLoginDialog }}
    >
      {children}
    </AuthContext.Provider>
  );
};
