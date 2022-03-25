import { Container, Grid, Link, Typography } from '@mui/material';
import ActionCard from '../components/ActionCard.component';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../routes/routes';
import rosie from './rosie.png';
import logo from './logo.png';

const WebsiteInfo = () => {
    return (
        <Container>
            <Grid container direction="row" alignItems="center" spacing={0}>
              <Grid item xs={10} md={10}>
                <img
                    src={rosie}
                    alt="ROSIE Logo"
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                    }}
                />
              </Grid>
              <Grid item xs={2} md={2}>
                <img
                    src={logo}
                    alt="Haiven Logo"
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                  <Typography variant="h5" sx={{ marginBottom: 1, marginTop: 3}} align="center">
                      Welcome to ROSIE lab's shout data collection site
                  </Typography>
                  <Typography align="center">
                      At ROSIE we build robots that are useful, friendly and fun!
                      We believe that robots can help us automate simple, repetitive
                      tasks while bringing joy to our lives. If you want to
                      know more about ROSIE LAB please see {}
                      <Link href="https://www.rosielab.ca/" underline="none">
                          our website
                      </Link>
                      . We are currently working with Haiven, a non profit organization 
                      improving the lives of those living with intimate partner violence,
                      to learn more about Haiven please see {}
                      <Link href="/ourPurpose" underline="none">
                          Our Purpose
                      </Link>
                      . We thank you very much for your support and
                      hope that you will consider donating your voice
                      today!
                  </Typography>
              </Grid>
            </Grid>
        </Container>
    );
};

export default function Home() {
    let history = useHistory();
    const handleClick = useCallback(
        (route: string) => {
            history.push(route);
        },
        [history]
    );

    const activityList = [
        {
            header: 'Donate your shouts',
            body: 'Click here to help us better understand shouted speech',
            onclick: () => handleClick(routePaths.DONATE_SHOUTS),
        },
    ];

    return (
        <Container
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
            <WebsiteInfo />
            {activityList.map((activity, index) => {
                return (
                    <ActionCard
                        key={index}
                        header={activity.header}
                        body={activity.body}
                        onClick={() => {
                            activity.onclick();
                        }}
                    />
                );
            })}
        </Container>
    );
}
