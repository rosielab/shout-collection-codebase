import { Container, Typography, Grid } from '@mui/material';
import ActionCard from '../components/ActionCard.component';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../routes/routes';
import logo from './logo.png';

const WebsiteInfo = () => {
    return (
        <Container>
            <Grid container direction="row" alignItems="stretch" spacing={0}>
                <Grid item xs={12} md={3}>
                    <Grid style={{ height: '100%' }}>
                        <img
                            src={logo}
                            alt="Haiven Logo"
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={{ xs: 2, md: 5 }}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#7DBCFF',
                                    fontFamily: "'Quicksand', 'sans-serif'",
                                }}
                            >
                                Haiven
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{ marginBottom: 1 }}>
                                Welcome to Haiven's data collection site
                            </Typography>
                            <Typography align="justify">
                                Haiven is a non profit organization working to
                                empower and improve the safety of those living
                                with intimate partner violence. If you want to
                                know more about our organization please click on
                                'Our Purpose'. We thank you very much for your
                                support and hope that you will consider donating
                                your voice today!
                            </Typography>
                        </Grid>
                    </Grid>
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
            body: 'Click here to help us improve safety of those living with intimate partner violence by better understanding shouted speech',
            onclick: () => handleClick(routePaths.TEACHER_VOICE),
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
