//#region IMPORTS
import React, { useRef, useState, useEffect } from "react";
import { useAuthProvider } from "../../Context/AuthProvider";
//import axios from "../../interceptors/axios";
import axios from "axios";
import * as storage from "../../Utility/LocalStorage";
import "../../interceptors/axios";
import jwt from "jwt-decode";
import { IUser } from "../../interface/IUser";
import Container from "@mui/system/Container";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/system/Box";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

//#endregion
type LoginProps = {
  isOpen: boolean;
  //setIsDialogOpen: SetStateAction<boolean> | any;
};

const Login = ({ isOpen }: LoginProps) => {
  // const authContext = useContext(AuthContext);
  const {
    auth,
    setAuth,
    closeLoginDialog,
    openRegisterDialog,
    setIsLoggedIn,
    setToken,
    token,
    role,
    setRole,
  } = useAuthProvider();
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickAway = () => {
    closeLoginDialog();
  };

  const onSignUpClick = () => {
    closeLoginDialog();
    openRegisterDialog();
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<IUserRequest, { data: IUser }>(
        "account/login",
        {
          userName,
          password,
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
      axios.defaults.headers.common["Authorization"] = `Brearer ${response.data.token}`;
      const tokenRes = response.data.token;
      const decoded: IUser = jwt(tokenRes as string);

      setAuth({
        username: response.data.username,
        firstname: response.data.firstname,
        token: tokenRes,
        role: decoded.role,
      });
      setToken(tokenRes as string);
      setRole(decoded.role);
      setUserName("");
      setPassword("");
      setSuccess(true);
      navigate(from, { replace: true });
      closeLoginDialog();
      setIsLoggedIn(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 500) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  useEffect(() => {
    storage.setItem("user", {
      firstname: auth.firstname,
      username: auth.username,
    });
    storage.setItem("jwt", token);
    storage.setItem("role", role);
  }, [success]);

  return (
    <Dialog
      onClose={handleClickAway}
      open={isOpen}
      sx={{ "& .MuiPaper-root": { backgroundColor: "#000451 " } }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "contents",
          justifyItems: "center",
          borderBlock: 2,
          borderBlockColor: "#4291b8",
        }}
      >
        <Box
          sx={{
            p: 3,

            backgroundColor: "#2c2c6c",
            borderRadius: "3%",
            justifyContent: "center",
          }}
        >
          <Box m={3}>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <DialogTitle variant={"inherit"} color={"white"}>
              Sign In
            </DialogTitle>

            <Box sx={{ maxWidth: "300px" }}>
              <form onSubmit={handleSubmit}>
                <FormControl sx={{ marginBottom: 2, width: "250px" }}>
                  <OutlinedInput
                    sx={{ background: "white" }}
                    type="text"
                    id="username"
                    placeholder="Username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                  />
                </FormControl>
                <FormControl sx={{ mb: 2, width: "250px" }}>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    autoComplete=""
                    sx={{ background: "white" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>

                <Button sx={{ mb: 2 }} type="submit" variant="contained">
                  Sign In
                </Button>
              </form>
            </Box>

            <Typography variant={"inherit"} color={"#fff"}>
              Need an Account?
            </Typography>
            <Button onClick={() => onSignUpClick()}>Sign Up</Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

interface IUserRequest {
  userName: string;
  password: string;
}

export default Login;
