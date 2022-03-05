import { Container, Typography } from '@mui/material';

interface RecordingPageProps {
    phonePosition: string;
    script: string;
    affect: string;
}

export const RecordingPage = ({ phonePosition, script, affect }: RecordingPageProps) => {
    const PhonePosition = () => {
        return (
            <Container>
                <Typography variant="h5" fontWeight="fontWeightBold">
                    {phonePosition}
                </Typography>
            </Container>
        );
    };

    const Affect = () => {
        return (
            <Container>
                <Typography
                    variant="h5"
                    sx={{ color: 'primary.dark', margin: 2 }}
                    fontWeight="fontWeightBold"
                >
                  Please use this emotion: {affect} 
                </Typography>
            </Container>
        );
    };

    const Script = () => {
        return (
            <Container>
                <Typography variant="h5" fontWeight="fontWeightBold">
                  Speak:  "a, {script}"
                </Typography>
                <Typography variant="h5" fontWeight="fontWeightBold">
                  Shout: "b, {script}"
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: 4 }} fontWeight="fontWeightBold" >
                  Scream: "c, {script}"
                </Typography>
                <Typography variant="h5">
                  You may listen to your audio and record as many times as you like, do not worry about
                  any background noises, we want those! Click next to submit.
                </Typography>
            </Container>
        );
    };

    return (
        <Container
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: 3,
            }}
        >
            <PhonePosition />
            <Affect />
            <Script />
        </Container>
    );
};
