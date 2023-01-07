import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function LoginControl() {
  const [userName, setUserName] = useState("itamar");
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
            bgcolor: stringToColor(userName),
            width: 30,
            height: 30,
            fontSize: 20,
          }}
          children={userName[0]}
        />
        <h3 style={{ paddingLeft: "45px", marginTop: "-27px" }}> {userName}</h3>
      </div>
    );
  } else {
    loginName = (
      <h3>
        <AccountCircleIcon style={{ margin: "-4px" }} /> Sign In
      </h3>
    );
  }

  return <div>LoginControl</div>;
}

export default LoginControl;
