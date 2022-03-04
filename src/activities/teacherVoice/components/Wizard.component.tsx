import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Container, Paper } from '@mui/material';
import { InfoPage } from '../pages/InfoPage';
import { PrimingPage } from '../pages/PrimingPage';
import { QuestionsPage } from '../pages/QuestionsPage';
import { RecordingPage } from '../pages/RecordingPage';
import { PrimingRankingPage } from '../pages/PrimingRankingPage';
import Recorder from './recorder/Recorder.component';
import { questions } from '../helpers/questions';
import * as uuid from 'uuid';
import {
    formatUserData,
    getUserAnswersDefaultState,
    UserAnswersObject,
} from '../helpers/userAnswers';
import {
    getRankingAudios,
    getWouldYouRatherAudios,
    primingAudio,
    AudioObject,
} from '../helpers/primingAudio';
import { getRecordingData } from '../helpers/recordingData';
import { userQuestionAnswerValid } from '../helpers/validator';
import { scenerios } from '../helpers/scenerios';
import { allScripts } from '../helpers/scripts';
import { SubmitAlert, ALERT_MODE } from './alerts/SubmitAlert.component';
import { MessageAlert } from './alerts/MessageAlert.component';
import { pollResults, sendS3, sendUserData } from '../apis/apis';
import { useInterval } from '../hooks/useInterval';
import { AudioFeatureResults } from '../helpers/extractedResults';
import { ResultsPage } from '../pages/ResultsPage';
import { getCitations, STEP_PAGE } from '../helpers/wizardHelpers';
import { LoadingPage } from '../pages/LoadingPage';

export const Wizard = (props: any) => {
    const [step, setStep] = useState(0);
    const [canonicalUserID] = useState(`user_${uuid.v4()}`);
    const [answers, setAnswer] = useState<UserAnswersObject>(
        getUserAnswersDefaultState(canonicalUserID)
    );
    const [wouldYouRatherAudio] = useState<Array<AudioObject>>(
        getWouldYouRatherAudios(primingAudio)
    );
    const [rankAudios] = useState<Array<AudioObject>>(
        getRankingAudios(primingAudio)
    );
    const [recordingData, setRecordingData] = useState(
        getRecordingData(scenerios, allScripts)
    );
    const [showSubmitAudioModal, setShowSubmitAudioModal] = useState(false);
    const [showMessageAlert, setShowMessageAlert] = useState(false);
    interface MessageAlert {
        title: string;
        message: string;
        cta?: () => void;
        buttonTitle?: string;
    }
    const [messageAlert, setMessageAlert] = useState<MessageAlert>({
        title: '',
        message: '',
    });
    const [alertMode, setAlertMode] = useState(ALERT_MODE.INFORM);
    const [recordingBlob, setRecordingBlob] = useState<Blob>();
    const [audioId, setAudioId] = useState<string>();
    const [pollFlag, setPollFlag] = useState<Boolean>(false);
    const [extractionResults, setExtractionResults] =
        useState<AudioFeatureResults | null>();
    const [pollingRetriesCount, setPollingRetriesCount] = useState<number>(0);

    const audioCitations = [
        ...wouldYouRatherAudio?.map((audio) => audio.citation),
        ...rankAudios?.map((audio) => audio?.citation),
    ];
    const recordingCitation = [
        ...recordingData?.map((data) => data.script?.cite),
    ];

    const handleAnswerChange = useCallback((answer: UserAnswersObject) => {
        setAnswer(answer);
    }, []);

    const displayMessageAlert = (
        message: string,
        title?: string,
        cta?: () => void,
        buttonTitle?: string
    ) => {
        setMessageAlert({
            title: title || '',
            message,
            cta: cta,
            buttonTitle: buttonTitle,
        });
        setShowMessageAlert(true);
    };

    const goBackToRecording = useCallback(() => {
        setExtractionResults(null);
        setRecordingBlob(undefined);
        setRecordingData(getRecordingData(scenerios, allScripts));
        setStep(STEP_PAGE.FIRST_RECORDING);
        setShowMessageAlert(false);
    }, []);

    const handlePlayAgain = useCallback(() => {
        goBackToRecording();
        displayMessageAlert(
            'Since you have already answered the demographic questions, you can get straight into the activity.',
            'Thanks for playing again!'
        );
    }, [goBackToRecording]);

    const handleFailToGetResults = useCallback(() => {
        displayMessageAlert(
            'You can try recording again by clicking the button below or if you would like, click the x above to checkout the data of our instructors',
            "Uh Oh! We weren't able to get your results!",
            goBackToRecording,
            'Try recording again'
        );
    }, [goBackToRecording]);

    const handlePrevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleNextStep = () => {
        if (onRecordingPage) {
            setShowSubmitAudioModal(true);
            return;
        }

        if (step < MAX_PAGES) setStep(step + 1);
    };

    const pages = [
        <InfoPage />,
        ...questions.map((question, index) => (
            <QuestionsPage
                triggerAlert={displayMessageAlert}
                key={index}
                question={question}
                answers={answers}
                setAnswer={handleAnswerChange}
            />
        )),
        <PrimingPage
            audioFiles={wouldYouRatherAudio}
            setAnswer={handleAnswerChange}
            answers={answers}
        />,
        <PrimingRankingPage
            audioFiles={rankAudios}
            setAnswer={handleAnswerChange}
            answers={answers}
        />,
        <RecordingPage recordingData={recordingData[0]} />,
        <RecordingPage recordingData={recordingData[1]} />,
        <LoadingPage
            handleNextStep={handleNextStep}
            pollingRetriesCount={pollingRetriesCount}
            extractionResults={extractionResults}
        />,
        <ResultsPage
            userData={extractionResults}
            handlePlayAgain={handlePlayAgain}
            handleFailToGetResults={handleFailToGetResults}
        />,
    ];

    const MAX_PAGES = pages.length - 1;

    const onRecordingPage =
        step === STEP_PAGE.FIRST_RECORDING ||
        step === STEP_PAGE.SECOND_RECORDING;
    const selectRecordData = () => {
        if (step === STEP_PAGE.FIRST_RECORDING) return recordingData[0];
        if (step === STEP_PAGE.SECOND_RECORDING) return recordingData[1];
    };

    const processAudio = async () => {
        if (!recordingBlob) return;
        const curRecordingData = selectRecordData();
        try {
            setAlertMode(ALERT_MODE.LOADING);
            if (step === STEP_PAGE.FIRST_RECORDING) {
                const formatData = formatUserData(answers);
                await sendUserData(formatData);
            }
            const fileID = await sendS3(recordingBlob, {
                userID: canonicalUserID,
                audience: curRecordingData?.audience,
                environment: curRecordingData?.type,
                script: curRecordingData?.script.text,
            });

            // for now only poll for the first audio
            if (step === STEP_PAGE.FIRST_RECORDING) {
                setAudioId(fileID);
            }
            setAlertMode(ALERT_MODE.SUCCESS);
            setRecordingBlob(undefined);
        } catch (e) {
            setAlertMode(ALERT_MODE.FAILED);
        }
    };

    useEffect(() => {
        if (onRecordingPage && !showSubmitAudioModal) {
            setAlertMode(ALERT_MODE.INFORM);
        }
    }, [onRecordingPage, showSubmitAudioModal]);

    const POLLING_RATE = 10000;
    useInterval(
        async () => {
            // Once on the results page, Polling will stop
            if (audioId && step !== STEP_PAGE.RESULTS) {
                const response = await pollResults(audioId);
                if (response) {
                    setPollFlag(false);
                    setExtractionResults(response);
                }
                // no more retries
                if (pollingRetriesCount >= 8) {
                    setPollFlag(false);
                }

                setPollingRetriesCount(pollingRetriesCount + 1);
            }
        },
        POLLING_RATE,
        pollFlag
    );

    // this triggers when an audio id is returned from the s3 calls
    // it makes the initial fetch data and if it does not get data it will trigger polling
    useEffect(() => {
        async function fetchData(id: string) {
            const response = await pollResults(id);
            if (!response) {
                setPollFlag(true);
            }
            return response;
        }
        if (onRecordingPage && audioId) {
            fetchData(audioId);
        }
    }, [audioId, onRecordingPage]);

    const closeModal = () => {
        setShowSubmitAudioModal(false);
        setStep(step + 1);
        setAlertMode(ALERT_MODE.INFORM);
    };

    const canGoToNext = () => {
        if (
            step <= STEP_PAGE.QUESTION_END &&
            step >= STEP_PAGE.QUESTION_START
        ) {
            return userQuestionAnswerValid(
                answers,
                questions[step - STEP_PAGE.QUESTION_START]
            );
        }

        if (step === STEP_PAGE.PRIME_WOULD_YOU_RATHER) {
            return answers.wouldYouRather.chosen !== null;
        }

        if (step === STEP_PAGE.PRIME_RANKING_AUDIOS) {
            return answers.rankAudios !== null;
        }

        if (onRecordingPage) {
            return !!recordingBlob;
        }

        return true;
    };

    const showCitation = onRecordingPage || step === STEP_PAGE.RESULTS;

    const showBackButton =
        step !== 0 &&
        step !== STEP_PAGE.SECOND_RECORDING &&
        step !== STEP_PAGE.LOADING &&
        step !== STEP_PAGE.RESULTS;

    const showNextButton =
        step !== STEP_PAGE.LOADING && step !== STEP_PAGE.RESULTS;

    const inputItem = () => {
        // this forces the recorder to re-render and restart all of its internal states
        if (step === STEP_PAGE.FIRST_RECORDING) {
            return (
                <Recorder
                    key={STEP_PAGE.FIRST_RECORDING}
                    setRecordingBlob={setRecordingBlob}
                    displayMessageAlert={displayMessageAlert}
                />
            );
        } else if (step === STEP_PAGE.SECOND_RECORDING) {
            return (
                <Recorder
                    key={STEP_PAGE.SECOND_RECORDING}
                    setRecordingBlob={setRecordingBlob}
                    displayMessageAlert={displayMessageAlert}
                />
            );
        } else {
            return <></>;
        }
    };

    return (
        <>
            <Paper
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    padding: 3,
                }}
            >
                <Container sx={{ flex: 1 }}>{pages[step]}</Container>
                <Box
                    sx={{
                        justifyContent: 'space-between',
                        display: 'flex',
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    }}
                >
                    {showBackButton && (
                        <Button
                            variant="contained"
                            sx={{
                                order: { xs: 1, sm: 0 },
                                width: 70,
                                height: 40,
                                marginTop: { xs: 4, sm: 0 },
                            }}
                            onClick={handlePrevStep}
                        >
                            Back
                        </Button>
                    )}
                    {inputItem()}
                    {showNextButton && (
                        <Button
                            variant="contained"
                            onClick={handleNextStep}
                            disabled={!canGoToNext()}
                            sx={{
                                order: { xs: 2, sm: 2 },
                                width: 70,
                                height: 40,
                                marginTop: { xs: 4, sm: 0 },
                                marginLeft: { xs: 'auto' },
                            }}
                        >
                            Next
                        </Button>
                    )}
                </Box>
                <SubmitAlert
                    open={showSubmitAudioModal}
                    setOpen={setShowSubmitAudioModal}
                    handleAgreeSubmit={() => processAudio()}
                    alertMode={alertMode}
                    handleClose={closeModal}
                />
                <MessageAlert
                    open={showMessageAlert}
                    setOpen={setShowMessageAlert}
                    message={messageAlert.message}
                    title={messageAlert.title}
                    cta={messageAlert?.cta}
                    buttonTitle={messageAlert?.buttonTitle}
                />
            </Paper>
            {showCitation &&
                getCitations(step, audioCitations, recordingCitation)}
        </>
    );
};
