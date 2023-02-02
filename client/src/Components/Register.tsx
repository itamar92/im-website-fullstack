//#region IMPORTS
import React, { useRef, useState, useEffect } from "react";
import { useAuthProvider } from "../Context/AuthProvider";
//import axios from "../../interceptors/axios";
import axios from "axios";
import jwt from "jwt-decode";
import * as storage from "../Utility/LocalStorage";
import "../interceptors/axios";
import { IUser } from "../interface/IUser";
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
  Stack,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

//#endregion
type RegisterProps = {
  isOpen: boolean;
  //setIsDialogOpen: SetStateAction<boolean> | any;
};

const Register = ({ isOpen }: RegisterProps) => {
  // const authContext = useContext(AuthContext);
  const {
    auth,
    setAuth,
    closeRegisterDialog,
    openLoginDialog,
    setIsLoggedIn,
    setRole,
    setToken,
    role,
    token,
  } = useAuthProvider();
  const userRef = useRef<HTMLInputElement>();
  const errRef = useRef<HTMLParagraphElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwdMsg, setPasswdMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickAway = () => {
    closeRegisterDialog();
    //setOpen(false);
    //navigate(from, { replace: true });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
   
  };
  

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);
  };

    
  const onLoginClick = () => {
    closeRegisterDialog();
    openLoginDialog();
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");

    if (password.length > 0 &&!/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(password)) {
      setPasswdMsg('Password must contain at least one uppercase letter, one digit, and be at least 8 characters long');
    } else {
      setPasswdMsg("");
      setPasswordErr(false);
    }
     }, [userName, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setErrMsg('Passwords do not match');
      return;
    } else 

    try {
      const response = await axios.post<IUserRequest, { data: IUser }>(
        "account/register",
        {
          firstName,
          lastName,
          userName,
          password,
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );

      const tokenRes = response.data.token;
      const decoded: IUser = jwt(tokenRes as string);

      setAuth(response.data);
      setToken(tokenRes as string);
      setRole(decoded.role);
      setUserName("");
      setPassword("");
      setSuccess(true);
      closeRegisterDialog();
      setIsLoggedIn(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username already exist");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 500) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Sign Up Failed");
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
              Sign Up
            </DialogTitle>

            <Box sx={{ maxWidth: "17rem" }}>
              <form onSubmit={handleSubmit}>
                <Stack direction={"row"} gap={2}>
                  <FormControl sx={{ marginBottom: 2, flexGrow: 1 }}>
                    <OutlinedInput
                      sx={{ background: "white" }}
                      type="text"
                      id="firstname"
                      placeholder="First name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      required
                    />
                  </FormControl>
                  <FormControl sx={{ marginBottom: 2, flexGrow: 1 }}>
                    <OutlinedInput
                      sx={{ background: "white" }}
                      type="text"
                      id="lastname"
                      placeholder="Last name"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      required
                    />
                  </FormControl>
                </Stack>
                <FormControl
                  sx={{ marginBottom: 2, flexGrow: 1, width: "100%" }}
                >
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

                <FormControl sx={{ mb: 2, flexGrow: 1, width: "100%" }}>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                    required
                    onFocus={() => setPasswordErr(true)}
                    // onBlur={() => setPasswordFocus(false)}
                    autoComplete="off"
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
                {passwordErr ? (
                  <Typography color={"firebrick"}>{passwdMsg}</Typography>
                ) : (
                  ""
                )}
                <FormControl sx={{ my: 2, flexGrow: 1, width: "100%" }}>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                    value={passwordConfirm}
                    required
                    autoComplete="off"
                    sx={{ background: "white" }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
                {!passwordMatch ? (
                  <Typography color={"firebrick"}>{passwdMsg}</Typography>
                ) : (
                  ""
                )}
                <Button sx={{ mb: 2 }} type="submit" variant="contained">
                  Sign Up
                </Button>
              </form>
            </Box>

            <Typography variant={"inherit"} color={"#fff"}>
              Already have an Account?
            </Typography>
            <Button variant="outlined" color="inherit" sx={{color:"white", mt:1}} onClick={() => onLoginClick()}>Login</Button>
          </Box>
        </Box>
      </Container>
    </Dialog>
  );
};

interface IUserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

export default Register;
