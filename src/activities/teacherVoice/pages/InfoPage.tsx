import { Container, Typography } from '@mui/material';

export const InfoPage = () => {
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
                How does your voice compare to a teacher
            </Typography>
            <Typography variant="body1">
                This experiment is being conducted by researchers at Simon
                Fraser University to identify voice patterns in an educational
                setting. We want to find what makes someones voice engaging. In
                this experiment, you will be reading some text in your best
                teacher voice. You’ll have to answer a few questions so we can
                use it to process the voice. Once the voice is processed, we
                will be comparing it with well-known educators (Bill Nye, Hank
                Green and more). This research has no known risks or anticipated
                direct benefits. You will not receive compensation for
                participating in this experiment. Your participation in this
                research is completely voluntary. You can end your participation
                at any time without penalty. Your participation is completely
                anonymous.
            </Typography>
        </Container>
    );
};
