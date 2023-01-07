import { Container } from "@mui/material";
import React from "react";

function About() {
  return (
    <section id="about">
      <Container maxWidth="lg" className="about__container ">
        <h1>About the Site</h1>

        <div className="about__me"></div>

        <div className="about__content">
          Here you could find Original Royelty music for your videos,
          commercials,Podcast or youtube videos. By clicking on the Products
          page you can listen to all kind of diffrent style of music and with a
          simple click it will be sent to your email account. This site was
          built by me using React and Java Script.
        </div>

        {/* <a href="#contact" className="btn btn-primary">
        Lets Talk
      </a> */}
      </Container>
      {/* </div> */}
    </section>
  );
}

export default About;
