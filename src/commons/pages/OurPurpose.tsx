import { Typography, Container, Link } from '@mui/material';

export const OurPurpose = () => {
  return(
    <Container>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 3 }}
      >
          About ROSIE Lab
      </Typography>
      <Typography
        variant="body1" 
        sx={{ marginBottom: 2 }}
      >
          We build robots that are useful, friendly and fun! We believe that robots can help us automate simple, repetitive tasks while bringing joy to our lives.
      </Typography>
      <Typography>
          We work on 3 main areas:
      </Typography>
      <ul>
        <li>Building robots that are useful and interact naturally and seamlessly with humans.</li>
        <li>Developing smart AI software to help robots understand what humans do, think, feel and mean.</li>
        <li>Creating new AI algorithms and implementing models of the human mind based on neuroscience, psychology and developmental science.</li>
      </ul>
      <Typography
        variant="body1" 
        sx={{ marginBottom: 2 }}
      >
          To learn more about ROSIE lab see {}
          <Link href="https://www.rosielab.ca/" underline="none">
            our website
          </Link>
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 3 }}
      >
          About Haiven
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', marginBottom: 3 }}
      >
          Haiven's Mission
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Our mission is to provide victims and survivors of abuse with software services to improve their safety,
        well-being and independence. Haiven is addressing not only the crisis of intimate partner violence but also the
        aftermath by supporting those living with and surviving domestic violence, supporting agency, empowerment
        and security by providing guided access to our network of partnerships.
      </Typography>
      <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', marginBottom: 3 }}
      >
          Haiven's Vision
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Our vision is to be able to create accessible technology and services to help someone through the process of
        exiting an abusive relationship and ensure they have the economic power to leave and stay out of it.
      </Typography>
    </Container>
  );
};
