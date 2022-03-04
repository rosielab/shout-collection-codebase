import { Container, Typography } from '@mui/material';
import ActionCard from '../components/ActionCard.component';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../routes/routes';

const WebsiteInfo = () => {
    return (
        <Container>
            <Container
                sx={{
                    marginBottom: 3,
                    maxWidth: { sx: '100%', lg: '70%' },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ fontWeight: 'bold', color: '#587A7F' }}
                >
                    Hello Citizen!
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                    Welcome to Now With Feeling
                </Typography>
                <Typography>
                    We are a citizen science project! Our purpose is to collect
                    and analyze data with the help of you, fellow citizen! Using
                    this data, we want to help people that don’t have the
                    resources to learn more effectively through robots
                </Typography>
                <Typography
                    sx={{ fontWeight: 'bold', color: '#587A7F', marginTop: 3 }}
                >
                    Click and select an activity below!
                </Typography>
            </Container>
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
            header: "How does your voice compare to a teacher's voice?",
            body: 'Learn about what features are in your voice like pitch mean, pitch range, and more!',
            onclick: () => handleClick(routePaths.TEACHER_VOICE),
        },
        {
            header: 'More activities coming soon!',
            body: 'Check back later',
            onclick: () => {},
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
