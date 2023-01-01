import { useState, createContext } from "react";

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
  
    const auth = async (email:string, password:string) => {
      var response = await fetch(
        `http://localhost:5000/users?email=${email}&password=${password}`,
        { method: "GET" }
      );
      return await response.json();
    };
  

    return (
        <UserContext.Provider
          value={{
            
          }}
        >
          {children}
        </UserContext.Provider>
      );
    }
    
    export default UserProvider;