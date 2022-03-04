import { Box, Container, Typography } from '@mui/material';
import { RecordingData } from '../helpers/recordingData';

interface RecordingPageProps {
    recordingData: RecordingData;
}

export const RecordingPage = ({ recordingData }: RecordingPageProps) => {
    const PromptText = () => {
        return (
            <Container>
                <Typography variant="h5" fontWeight="fontWeightBold">
                    {`Imagine you’re a ${recordingData.type} reading the phrase to ${recordingData.audience}`}
                </Typography>
            </Container>
        );
    };

    const Instructions = () => {
        return (
            <Container>
                <Typography
                    variant="body1"
                    sx={{ color: 'primary.dark', margin: 2 }}
                    fontWeight="fontWeightBold"
                >
                    Practice reading this passage below. When you’re ready,
                    click record and start reading. You can retry as many times
                    as you would like by clicking the record button again.
                </Typography>
            </Container>
        );
    };

    const Script = () => {
        return (
            <Container>
                <Typography>{`"${
                    recordingData.script?.text || ''
                }"`}</Typography>
            </Container>
        );
    };

    const ScenerioImage = () => {
        return (
            <Box
                component="img"
                sx={{
                    width: '100%',
                    maxWidth: '80vh',
                    flex: 1,
                    alignSelf: 'flex-start',
                    overflow: 'hidden',
                }}
                alt=""
                src={recordingData.image}
            />
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
            <PromptText />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <ScenerioImage />
            </Box>
            <Instructions />
            <Script />
        </Container>
    );
};
