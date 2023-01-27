import Avatar from "@mui/material/Avatar";
import { Stack, Typography } from "@mui/material";
import { useAuthProvider } from "../../Context/AuthProvider";

function LoginControl() {
  const { auth, isLoggedIn } = useAuthProvider();
  let loginName;
  if (auth !== undefined) {
    let firstName = auth?.firstname;
      loginName = (
        <Stack
          direction={"row"}
          alignItems="center"
          gap={2}
          sx={{ mr: { xs: 0, md: 1 } }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: 30,
              height: 30,
              fontSize: 20,
              color: "primary.main",
            }}
            children={firstName[0]}
          />
          <Typography variant="inherit" color={"#fff"} fontSize={23}>
            {firstName}
          </Typography>
        </Stack>
      );
    } else {
      loginName = <Avatar sx={{
        bgcolor: "secondary.main",
        width: 30,
        height: 30,
        fontSize: 20,
        color: "primary.main",
      }}/>;
    }
  

  return <div>{loginName}</div>;
}
export default LoginControl;
