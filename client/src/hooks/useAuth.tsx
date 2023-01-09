
import { useDebugValue } from "react";
import { useAuthProvider } from "../Context/AuthProvider";

const useAuth = () => {
    const { auth } = useAuthProvider();
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useAuthProvider;
}

export default useAuth;