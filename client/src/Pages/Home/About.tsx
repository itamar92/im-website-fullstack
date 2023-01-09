import Grid from "@mui/material/Grid";

function About() {
  return (
    <section id="about">
      <>
        <h1>About the Site</h1>
        <Grid container spacing={2} alignItems="center" p={4}>
          <Grid lg={4} className="about__me"></Grid>

          <Grid lg={4} className="about__content">
            <p>
              Here you could find Original Royelty music for your videos,
              commercials,Podcast or youtube videos. By clicking on the Products
              page you can listen to all kind of diffrent style of music and
              with a simple click it will be sent to your email account. This
              site was built by me using .NET ASP and ReactTS.
            </p>
          </Grid>
        </Grid>
      </>
    </section>
  );
}

export default About;
