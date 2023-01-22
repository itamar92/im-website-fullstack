import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthProvider } from "../../Context/AuthProvider";
import IconButton from "@mui/material/IconButton";
import { Box, Stack, Typography } from "@mui/material";

function LoginControl() {
  const { auth } = useAuthProvider();
  const {isLoggedIn} = useAuthProvider();

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
      <Stack direction={'row'} alignItems='center' gap={2} sx={{mr:{xs:0, md:1}}}>
        <Avatar
          sx={{
            bgcolor: stringToColor(auth.firstname),
            width: 30,
            height: 30,
            fontSize: 20,
          }}
          children={auth.firstname[0]}
        />
        <Typography variant="inherit" color={'#fff'} >
          {auth.firstname}
        </Typography>
      </Stack>
    );
  } else {
    loginName = (
      <Box sx={{alignSelf:'center', color:'#fff', gap:2}}>
        <AccountCircleIcon /> Sign In
      </Box>
    );
  }

  return <div>{loginName}</div>;
}

export default LoginControl;
