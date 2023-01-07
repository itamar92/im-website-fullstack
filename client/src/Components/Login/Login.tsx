//#region IMPORTS
import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import axios from "../../clientApi/axios";
import { User } from "../../interface/user";
import Container from "@mui/system/Container";
import FormControl from "@mui/material/FormControl";
import Backdrop from "@mui/material/Backdrop";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/system/Box";
import FocusTrap from "@mui/base/FocusTrap";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//#endregion
const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [dropOpen, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickAway = () => {
    setOpen(false);
    navigate(from, { replace: true });
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
      const response = await axios.post<IUserRequest, { data: User }>(
        LOGIN_URL,
        {
          userName,
          password,
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
      console.log(response.data);
      const accessToken = response;
      authContext?.setAuth(response.data);
      setUserName("");
      setPwd("");
      setSuccess(true);
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
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
    console.log(authContext?.auth);
  }, []);

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={!dropOpen}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Container
          maxWidth="sm"
          sx={{ display: "contents", justifyItems: "center" }}
        >
          {success ? (
            <section>
              <h1>You are logged in!</h1>
              <br />
              <p>
                <a href="/">Go to Home</a>
              </p>
            </section>
          ) : (
            <div>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>Sign In</h1>

              <Box sx={{ maxWidth: "300px", justifyItems: "center" }}>
                <form onSubmit={handleSubmit}>
                  <FormControl sx={{ marginBottom: 2, width: "25ch" }}>
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
                  <FormControl sx={{ marginBottom: 2, width: "25ch" }}>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={password}
                      required
                      sx={{ background: "white" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <br />
                  <Button
                    sx={{ marginBottom: 2 }}
                    type="submit"
                    variant="contained"
                  >
                    Sign In
                  </Button>
                </form>
              </Box>

              <p>
                Need an Account?
                <br />
                <span className="line">
                  {/*put router link here*/}
                  <a href="#">Sign Up</a>
                </span>
              </p>
            </div>
          )}
        </Container>
        </ClickAwayListener>
    </Backdrop>
  );
};

const LOGIN_URL = "/account/login";

interface IUserRequest {
  userName: string;
  password: string;
}

interface ILoginResponse {
  data: User;
}

export default Login;
