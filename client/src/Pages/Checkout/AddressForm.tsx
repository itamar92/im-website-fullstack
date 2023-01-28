import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAuthProvider } from "../../Context/AuthProvider";

export default function AddressForm() {
  const { auth } = useAuthProvider();
  const [userDetails, setDetails] = React.useState({
    firstName: `${auth.firstname}`,
    lastName: "",
  });
  const [userAddress, setUserAddress] = React.useState({
    city: "",
    address1: "",
    address2: "",
    state: "",
    zip: "",
    country: "",
  });
  console.log(userDetails);
  console.log(userAddress);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            placeholder="First name"
            onChange={(e) =>
              setDetails({ ...userDetails, firstName: e.target.value })
            }
            value={auth.firstname}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            value={userDetails.lastName}
            onChange={(e) =>
              setDetails({ ...userDetails, lastName: e.target.value })
            }
            placeholder="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            onChange={(e) =>
              setUserAddress({ ...userAddress, address1: e.target.value })
            }
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            onChange={(e) =>
              setUserAddress({ ...userAddress, address2: e.target.value })
            }
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            onChange={(e) =>
              setUserAddress({ ...userAddress, city: e.target.value })
            }
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            onChange={(e) =>
              setUserAddress({ ...userAddress, state: e.target.value })
            }
            label="State/Province/Region"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            onChange={(e) =>
              setUserAddress({ ...userAddress, zip: e.target.value })
            }
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            onChange={(e) =>
              setUserAddress({ ...userAddress, country: e.target.value })
            }
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="primary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
