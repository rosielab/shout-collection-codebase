import { Container, Typography } from '@mui/material';
import React from 'react';
import { questions } from './questions';

export enum STEP_PAGE {
    QUESTION_START = 1,
    QUESTION_END = questions.length,
    PRIME_WOULD_YOU_RATHER = questions.length + 1,
    PRIME_RANKING_AUDIOS = questions.length + 2,
    FIRST_RECORDING = STEP_PAGE.PRIME_RANKING_AUDIOS + 1,
    SECOND_RECORDING = STEP_PAGE.FIRST_RECORDING + 1,
    LOADING = STEP_PAGE.SECOND_RECORDING + 1,
    RESULTS = STEP_PAGE.LOADING + 1,
}

export const getCitations = (
    step: number,
    audioCitations: Array<JSX.Element | string>,
    recordingCitation: Array<JSX.Element | string>
) => {
    if (
        step === STEP_PAGE.FIRST_RECORDING ||
        step === STEP_PAGE.SECOND_RECORDING
    ) {
        return (
            <Container
                sx={{
                    fontSize: 10,
                    color: 'neutral.dark',
                    margin: 1,
                    textAlign: 'right',
                }}
            >
                {recordingCitation[step === STEP_PAGE.FIRST_RECORDING ? 0 : 1]}
            </Container>
        );
    }
    if (step === STEP_PAGE.RESULTS) {
        return (
            <>
                <Typography
                    sx={{
                        fontSize: 10,
                        color: 'neutral.dark',
                        margin: 1,
                        textAlign: 'right',
                    }}
                >
                    {`This website used the follow creative commons audio:`}
                </Typography>
                <Container
                    sx={{
                        fontSize: 10,
                        color: 'neutral.dark',
                        margin: 1,
                        textAlign: 'right',
                    }}
                >
                    {audioCitations.map((citation, index) => (
                        <React.Fragment key={index}>
                            {' '}
                            {citation}{' '}
                        </React.Fragment>
                    ))}
                </Container>
            </>
        );
    }
};
