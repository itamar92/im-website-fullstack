import { useState, createContext } from "react";
import axios, { AxiosResponse } from "axios";
import { urlUsers } from "../endpoints";


export const UserContext = createContext({});

function UserProvider( children: any ) {
    const [details, setDetails] = useState({
      id: "",
      name: "",
      email: "",
      password: "",
    });
    //const [userName, setUser] = useLocalStorage("userName", "");
    const [error, setError] = useState("");
    //const [isLoggedIn, setIsLoggedIn] = useLocalStorage("login", false);
  
   // const [isAdmin, setAdmin] = useLocalStorage("admin", false);
  
   const getUsers = async () => {
    await axios.get(urlUsers).then((response: AxiosResponse<any>) => {
    setDetails(response.data);
    })};
  

    return (
        <UserContext.Provider
          value={{
            details,
            getUsers
          }}
        >
          {children}
        </UserContext.Provider>
      );
    }
    
    export default UserProvider;