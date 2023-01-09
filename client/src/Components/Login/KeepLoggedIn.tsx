import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import { useAuthProvider } from "../../Context/AuthProvider";

function KeepLoggedIn() {
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = useAuthProvider();
  
    useEffect(() => {
      !auth.token ? setIsLoading(true) : setIsLoading(false);
    }, []);
  
    useEffect(() => {
      console.log(`isLoading: ${isLoading}`);
      console.log(`AccessToken: ${JSON.stringify(auth?.token)}`);
    }, []);
  
    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}

export default KeepLoggedIn