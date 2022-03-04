import { CircularProgress, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AudioFeatureResults } from '../helpers/extractedResults';
import { useInterval } from '../hooks/useInterval';

interface LoadingPageProps {
    pollingRetriesCount: number;
    handleNextStep: () => void;
    extractionResults: AudioFeatureResults | null | undefined;
}

export const LoadingPage = ({
    pollingRetriesCount,
    handleNextStep,
    extractionResults,
}: LoadingPageProps) => {
    const [isWait, setIsWait] = useState(true);
    useEffect(() => {
        if (pollingRetriesCount >= 5 || !!extractionResults) {
            handleNextStep();
            setIsWait(false);
        }
    }, [pollingRetriesCount, handleNextStep, extractionResults]);

    // if we weren't able to trigger the above use-effect,
    // we will go to the next page after waiting 30 seconds
    const WAIT_TIME = 30000;
    useInterval(
        () => {
            if (pollingRetriesCount < 5 && extractionResults === null) {
                handleNextStep();
            }
            setIsWait(false);
        },
        WAIT_TIME,
        isWait
    );

    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <CircularProgress style={{ marginBottom: 40 }} />
            <Typography variant="h4">
                Hang on. We're getting your results!{' '}
            </Typography>
            <Typography variant="h6">
                Do not refresh the page. This should take roughly 30 seconds
            </Typography>
        </Container>
    );
};
