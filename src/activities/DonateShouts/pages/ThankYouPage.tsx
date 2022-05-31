import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const ThankYouPage = () => {
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.dark',
                    marginBottom: 3,
                }}
            >
                Thank you very much for submitting your voice!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Take a screenshot of this page and email ptuttosi@sfu.ca
                to receive a participation certificate!
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {'Click '}
                <Link to="/" style={{ color: '#7DBCFF' }}>
                    <span aria-hidden="true"></span>
                    here
                </Link>
                {' to return to the main page or exit to close'}
            </Typography>
        </Container>
    );
};
