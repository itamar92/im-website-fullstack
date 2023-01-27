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
import * as storage from "../Utility/LocalStorage";

type AuthContextType = {
  auth: IUser | any;
  setAuth: (auth: IUser) => void;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  loginDialog: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  openRegisterDialog: () => void;
  closeRegisterDialog: () => void;
  setLoggedInUser: () => void;
  setLoggedOutUser: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuthProvider() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorage('user',{});
  const [token, setToken] = useLocalStorage('jwt',"");
  const [loginDialog, setLoginDialog] = useState(false);
  const [registerDialog, setRegisterDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLoggedInUser = async () => {
    const parsedUser = await storage.getItem("user");
    const parsedToken = await storage.getItem("jwt");
    if (parsedToken !== "") {
      try {
        const response = await axios.get(
          `users/${parsedUser.username}`,
          {
            headers: {
              Authorization: `Bearer ${parsedToken}`,
            },
          }
        );
        setAuth(response.data);
        
        setIsLoggedIn(true);
      } catch (err: any) {
        if (!err?.response) {
          console.log("No Server Response");
        } else if (err.response?.status === 404) {
          console.log("Not Found");
        } else if (err.response?.status === 401) {
          console.log("Unauthorized");
        } else {
          console.log("Login Failed");
        }
      }
    } else return console.log("No User");
  };

  const setLoggedOutUser = () => {
    storage.removeItem("jwt");
    storage.removeItem("user");
    setIsLoggedIn(false);
    setAuth({});
    setToken("");
  }

  const openLoginDialog = () => setLoginDialog(true);
  const closeLoginDialog = () => setLoginDialog(false);
  const openRegisterDialog = () => setRegisterDialog(true);
  const closeRegisterDialog = () => setRegisterDialog(false);

  useEffect(() => {
    setLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        openLoginDialog,
        closeLoginDialog,
        openRegisterDialog,
        closeRegisterDialog,
        loginDialog,
        isLoggedIn,
        setIsLoggedIn,
        setLoggedInUser,
        setLoggedOutUser
      }}
    >
      {children}
      <Login isOpen={loginDialog} />
      <Register isOpen={registerDialog} />
    </AuthContext.Provider>
  );
};
