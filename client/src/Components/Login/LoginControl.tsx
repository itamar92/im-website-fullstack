import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthProvider } from "../../Context/AuthProvider";
import { IUser } from "../../interface/IUser";

function LoginControl() {
  // const authContext = useContext(AuthContext);
  const { auth } = useAuthProvider();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //#region Avatar    Icon Color
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  //#endregion

  let loginName;
  if (isLoggedIn) {
    loginName = (
      <div>
        <Avatar
          sx={{
            bgcolor: stringToColor(auth.firstname),
            width: 30,
            height: 30,
            fontSize: 20,
          }}
          children={auth.firstname[0]}
        />
        <h3 style={{ paddingLeft: "45px", marginTop: "-27px" }}>
          {" "}
          {auth.firstname}
        </h3>
      </div>
    );
  } else {
    loginName = (
      <p>
        <AccountCircleIcon /> Sign In
      </p>
    );
  }

  useEffect(() => {
    // let user = localStorage.getItem('user');
    // let parseUser = JSON.parse(user);
    // if (parseUser === "")
  }, []);

  return <div>{loginName}</div>;
}

export default LoginControl;
