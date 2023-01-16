import { Box, FormControl, Grid, OutlinedInput } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Container } from "@mui/system";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import React from "react";

function Contact() {
  return (
    <section id="contact">
      <Container >
        <h2>Contact Me</h2>
        <Grid container spacing={2} alignItems="center" pt={4}>
          <Grid container direction={"column"} className="contact__options" item lg={4} mr={10}>
            <Grid>
              <Box
                className="contact__option"
                sx={{
                  borderRadius: "10%",
                  alignItems: "center",
                }}
                p={4}
              >
                <EmailIcon className="contact__option-icon" />
                <h4>Email</h4>
                <h5>itamar92@gmail.com</h5>
                <a href="mailto:itamar92@gmail.com" target="_blank">
                  {" "}
                  Send a message
                </a>
              </Box>
            </Grid>
            <Box
              className="contact__option"
              sx={{
                borderRadius: "10%",
                textAlign: "center",
              }}
            >
              <FacebookIcon className="contact__option-icon" />
              <h4>Messanger</h4>
              <h5>Itamar Miron</h5>
              <a href="http://m.me/itamar.miron" target="_blank">
                {" "}
                Send a message
              </a>
            </Box>
            <Box
              className="contact__option"
              sx={{
                borderRadius: "10%",
              }}
            >
              <WhatsAppIcon className="contact__option-icon" />
              <h4>Whatsapp</h4>
              <h5>+972-526837081</h5>
              <a
                href="http://api.whatsapp.com/send?phone+9726837081"
                target="_blank"
              >
                {" "}
                Send a message
              </a>
            </Box>
          </Grid>

          <Grid item lg={4} className="about__content">
            <Box>
            <form className="contact__form" action="">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            rows={7}
            placeholder="Your Message"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
        </form>
            </Box>
          </Grid>

          {/* <a href="#contact" className="btn btn-primary">
        Lets Talk
      </a> */}
        </Grid>
      </Container>
    </section>
  );
}

export default Contact;

{
  /*  */
}
