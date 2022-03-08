import { Container, Typography } from '@mui/material';

export const InstructionsPage = () => {
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
                Some information before you begin
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }} >
              First off please be aware that you will need to be yelling periodically for approximately 30 minutes. 
              Please inform those around you so as not to alert, or cause distress to your neighbours and avoid any 
              possible punitive actions.
            </Typography >
            <Typography>
              Items to prepare:
              <ul>
                <li>Pants or jacket with pockets</li>
                <li>Purse/backpack/bag</li>
                <li>Something soft, e.g. pillow, blanket, sweater</li>
              </ul>
            </Typography>
            <Typography>
              Understanding the Voice levels
              <ol>
                <li>Speaking : this is a relaxed talking voice up to “raised voice”</li>
                <li>Shouting : this is raised voice until your voice breaks</li>
                <li>Screaming : this is the highest level where you feel the breaking in your voice as you go into a scream</li>
              </ol>
            </Typography>
            <Typography>
              You will be completing 19 recording with three of each voice level. For each recording you will be given a 
              random phrase and emotion as well as a position for your phone. Hold or place the phone in the provided position
              and do as follows:
              <ul>              
                  <li>say "a" and speak the phrase</li>
                  <li>say "b" and shout the phrase</li>
                  <li>say "c" and scream the phrase</li>
              </ul>
              When you have finished click "submit" and move on to the next ecording
          </Typography>
          <Typography>
            This page uses cookies, if you cannot complete all of the recordings at once you may start where you left off, given your cookies and chache have not been cleared.
          </Typography>
        </Container>
    );
};
