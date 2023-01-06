import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthProvider";
import axios from "../../clientApi/axios";
import { User } from "../../interface/user";
import Container from "@mui/system/Container";
import FormControl from "@mui/material/FormControl";
import Backdrop from "@mui/material/Backdrop";
import InputLabel from "@mui/material/InputLabel";
import {
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/system";

const Login: React.FC = () => {
  const [dropOpen, setOpen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const authContext = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

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

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  //   const submitSignIn = async (data: any) => {
  //     try {
  //       await axios({
  //         method: "post",
  //         url: "https://localhost:5001/api/account/login",
  //         headers: { "Content-Type": "application/json" },
  //         data: {
  //           username: data.userName,
  //           password: data.password,
  //         },
  //       }).then(function (response) {
  //         console.log(response.data);
  //         const recievedUser: User = {
  //           id: response.data.id,
  //           UserName: response.data.username,
  //           FirstName: response.data.firstName,
  //           LastName: response.data.lastName,
  //           Email: response.data.email,
  //           Token: response.data.email,
  //         };
  //         authContext?.setAuth(recievedUser);
  //         // navigate("/");
  //       });
  //     } catch (err: any) {
  //       if (!err?.response) {
  //         setErrMsg("No Server Response");
  //       } else if (err.response?.status === 400) {
  //         setErrMsg("Missing Username or Password");
  //       } else if (err.response?.status === 401) {
  //         setErrMsg("Unauthorized");
  //       } else {
  //         setErrMsg("Login Failed");
  //       }
  //       if (errRef.current) {
  //         errRef.current.focus();
  //       }
  //     }
  //   };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<UserRequest, User>(
        LOGIN_URL,
        {
          userName,
          password,
        },
        {
          headers: { "Access-Control-Allow-Origin": "*" },
          //withCredentials: true,
        }
      );
      console.log(response);
      //console.log(JSON.stringify(response));
      const accessToken = response;
      // const roles = response?.data?.roles;
      //   authContext?.setAuth( );
      setUserName("");
      setPwd("");
      setSuccess(true);
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

  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10 }} open={!dropOpen}>
      <Container maxWidth="sm">
        {success ? (
          <section>
            <h1>You are logged in!</h1>
            <br />
            <p>
              <a href="#">Go to Home</a>
            </p>
          </section>
        ) : (
          <section>
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
          </section>
        )}
      </Container>
    </Backdrop>
  );
};

const LOGIN_URL = "/account/login";

interface UserRequest {
  userName: string;
  password: string;
}

export default Login;
