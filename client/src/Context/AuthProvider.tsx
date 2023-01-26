import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import "../interceptors/axios";
import Login from "../Components/Login/Login";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interface/IUser";
import axios from "axios";
import Register from "../Components/Register";
import * as storage from '../Utility/LocalStorage'

type AuthContextType = {
  auth: IUser | any;
  setAuth: (auth: IUser) => void;
  loginDialog: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  openRegisterDialog: () => void;
  closeRegisterDialog: () => void;
  setLoggedInUser: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuthProvider() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorage("user", {});
  const [loginDialog, setLoginDialog] = useState(false);
  const [registerDialog, setRegisterDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedInUser = async () => {
  let parsedUser = await storage.getItem("user");
      try {
        const response = await axios.get(
          `account/users/${parsedUser.username}`
        );
        console.log(response.data);
        setAuth(response.data);
        setIsLoggedIn(true);
      } catch (err: any) {
        if (!err?.response) {
          console.log("No Server Response");
        } else if (err.response?.status === 400) {
          console.log("Missing Username or Password");
        } else if (err.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      }
    }
  

  const openLoginDialog = () => setLoginDialog(true);
  const closeLoginDialog = () => setLoginDialog(false);
  const openRegisterDialog = () => setRegisterDialog(true);
  const closeRegisterDialog = () => setRegisterDialog(false);

  useEffect(() => {
    // setLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        openLoginDialog,
        closeLoginDialog,
        openRegisterDialog,
        closeRegisterDialog,
        loginDialog,
        isLoggedIn,
        setIsLoggedIn,
        setLoggedInUser,
      }}
    >
      {children}
      <Login isOpen={loginDialog} />
      <Register isOpen={registerDialog} />
    </AuthContext.Provider>
  );
};
