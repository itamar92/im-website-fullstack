import Avatar from "@mui/material/Avatar";
import * as storage from "../../Utility/LocalStorage"
import {  Stack, Typography } from "@mui/material";
import { useAuthProvider } from "../../Context/AuthProvider";

function LoginControl() {
  const {auth} = useAuthProvider();
//  let firstName =  (storage.getItem("user")) ;
 let firstName =  auth.firstname;
     
    
  
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

  
    const loginName = (
      
      <Stack direction={'row'} alignItems='center' gap={2} sx={{mr:{xs:0, md:1}}}>
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 30,
            height: 30,
            fontSize: 20,
            color: 'primary.main'
          }}
          children={firstName[0]}
        />
        <Typography variant="inherit" color={'#fff'} fontSize={23} >
          {firstName}
        </Typography>
      </Stack>
    );
 

  return <div>{loginName}</div>;
}

export default LoginControl;
