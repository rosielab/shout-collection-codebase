import { Container, Typography } from '@mui/material';

interface RecordingPageProps {
    phonePosition: string;
    script: string;
    affect: string;
}

export const RecordingPage = ({ phonePosition, script, affect }: RecordingPageProps) => {
    const PhonePosition = () => {
        return (
            <Container sx={{ paddingX: 0 }}>
                <Typography variant="h5" fontWeight="fontWeightBold" sx={{ fontSize: {xs: 18, sm: 18, md: 24 } }}>
                    {phonePosition}
                </Typography>
            </Container>
        );
    };

    const Affect = () => {
        return (
            <Container sx={{ paddingX: 0 }}>
                <Typography
                    variant="h5"
                    sx={{ color: 'primary.dark', margin: 2, fontSize: {xs: 18, sm: 18, md: 24 }}}
                    fontWeight="fontWeightBold"
                >
                  Please use this emotion: {affect} 
                </Typography>
            </Container>
        );
    };

    const Script = () => {
        return (
            <Container sx={{ paddingX: 0 }}>
                <Typography variant="h5" fontWeight="fontWeightBold"  sx={{ fontSize: {xs: 18, sm: 18, md: 24 } }}>
                  Speak:  "a, {script}"
                </Typography>
                <Typography variant="h5" fontWeight="fontWeightBold" sx={{ fontSize: {xs: 18, sm: 18, md: 24 } }}>
                  Shout: "b, {script}"
                </Typography>
                <Typography variant="h5"  fontWeight="fontWeightBold" sx={{ marginBottom: 4 , fontSize: {xs: 18, sm: 18, md: 24 } }}>
                  Scream: "c, {script}"
                </Typography>
                <Typography variant="h5" sx={{ fontSize: {xs: 18, sm: 18, md: 24 } }}>
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
                paddingX: 0
            }}
        >
            <PhonePosition />
            <Affect />
            <Script />
        </Container>
    );
};
