import React, { useState, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "../endpoints";

export type AuthUser = {
  id: number
  userName: string
  email: string
}

type UserContextType = {
  user: AuthUser | null | any 
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null | any >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}
 export const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider(  {children}: UserContextProviderProps  ) {
    const [user, setUser] = useState<AuthUser | null>(null);
    //const [userName, setUser] = useLocalStorage("userName", "");
    const [error, setError] = useState("");
    //const [isLoggedIn, setIsLoggedIn] = useLocalStorage("login", false);
  
   // const [isAdmin, setAdmin] = useLocalStorage("admin", false);
  
   const getUsers = async () => {
    await axios.get(urlUsers).then((response: AxiosResponse<any>) => {
    setUser(response.data);
    })};
  

    return (
        <UserContext.Provider
          value={{
            user,
            setUser
          }}
        >
          {children}
        </UserContext.Provider>
      )
    }
    