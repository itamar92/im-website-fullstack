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

type AuthContextType = {
  auth: IUser | any;
  setAuth: (auth: IUser) => void;
  loginDialog: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  openDialog: () => void;
  closeDialog: () => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  const setLoggedInUser = async () => {
    let u = localStorage.getItem("user");
    if (u == undefined) return "No User";
    let parsedUser = JSON.parse(u);
    if (parsedUser === "") {
      return "No User";
    } else {
      try {
        const response = await axios.get(
          `account/users/${parsedUser.username}`
        );
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
  };

  const openDialog = () => setLoginDialog(true);
  const closeDialog = () => setLoginDialog(false);

  useEffect(() => {
    // setLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        openDialog,
        closeDialog,
        loginDialog,
        isLoggedIn,
        setIsLoggedIn,
        setLoggedInUser
      }}
    >
      {children}
      <Login isOpen={loginDialog} />
    </AuthContext.Provider>
  );
};
