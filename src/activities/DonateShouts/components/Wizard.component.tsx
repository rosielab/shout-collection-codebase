import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Paper } from '@mui/material';
import { InstructionsPage } from '../pages/InstructionsPage';
import { ThankYouPage } from '../pages/ThankYouPage';
import { QuestionsPage } from '../pages/QuestionsPage';
import { RecordingPage } from '../pages/RecordingPage';
import Recorder from './recorder/Recorder.component';
import { questions } from '../helpers/questions';
import { ConsentPage } from '../pages/ConsentPage';
import * as uuid from 'uuid';
import {
    formatUserData,
    getUserAnswersDefaultState,
    UserAnswersObject,
} from '../helpers/userAnswers';
import { userQuestionAnswerValid } from '../helpers/validator';
import { SubmitAlert, ALERT_MODE } from './alerts/SubmitAlert.component';
import { MessageAlert } from './alerts/MessageAlert.component';
import { pollResults, sendS3, sendUserData } from '../apis/apis';
import { useInterval } from '../hooks/useInterval';
import { STEP_PAGE } from '../helpers/wizardHelpers';
import { useCookies } from 'react-cookie';

const scriptObj = {
    1: "banana and mustard sandwiches",
    2: "wolf ring lights are fantastic",
    3: "hungry action hippos fruit",
    4: "another dog secretary show",
    5: "snow meteor down the chimney",
    6: "birds make new jingles",
    7: "heavy undersea birthday pumkins",
    8: "fluffy baseboard yogurt division",
    9: "zebra cats walking on lamps",
    10: "five special guest treasures",
    11: "ripped ocean jumper",
    12: "five dollar slaw onion cure",
    13: "the thunder break craze",
    14: "join the Ear Look club",
};

const affectObj = {
    1: "neutral",
    2: "anger",
    3: "joy",
    4: "fear",
    5: "disgust",
    6: "surprise",
    7: "sadness",
};

const phonePositions = [
    "Hold your phone next to your face with the mic facing your mouth as you would in a phone conversation 1/19",
    "Hold your phone next to your face but with the mic/phone facing away from your face 2/19",
    "Hold your phone next to your face with your hand covering the mic 3/19",
    "Hold your phone next to your hip with the back of phone on your palm 4/19",
    "Hold your phone next to your hip with your hand covering the mic 5/19",
    "Place your phone in your pocket 6/19",
    "Place your phone in a bag and hold it next to your hip 7/19",
    "Place phone 1-2 meters away face up on any surface 8/19",
    "Place phone 1-2 meters away face down on a hard surface 9/19",
    "Place phone 1-2 meters away face down on a soft surface 10/19",
    "Place phone 1-2 meters away in a bag 11/19",
    "Place phone on the opposite side of the room face up on any surface 12/19",
    "Place phone on the opposite side of the room face down on a hard surface 13/19",
    "Place phone on the opposite side of the room face down on a soft surface 14/19",
    "Place phone on the opposite side of the room in a bag 15/19",
    "Place phone as far away as possible while on on the opposite side of a wall from you face up on any surface 16/19",
    "Place phone as far away as possible while on on the opposite side of a wall from you face down on a hard surface 17/19",
    "Place phone as far away as possible while on on the opposite side of a wall from you face down on a soft surface 18/19",
    "Place phone as far away as possible while on on the opposite side of a wall from you in a bag 19/19",
];

interface RecordingPageData {
    phoneposition: string | null;
    script: number | null;
    affect: number | null;
};

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const Wizard = (props: any) => {
    const [step, setStep] = useState(-1);
    const [canonicalUserID, setCanonicalUserID] = useState(`user_${uuid.v4()}`);
    const [answers, setAnswer] = useState<UserAnswersObject>(
        getUserAnswersDefaultState(canonicalUserID)
    );
    const [stepCookies, setStepCookie, removeStepCookie] = useCookies(['step']);
    const [userCookies, setUserCookie, removeUserCookie] = useCookies(['userID']);
    const [newUser, setNewUser] = useState(false);

    useEffect(() => {
        if(userCookies["userID"] === undefined && stepCookies["step"] === undefined) {
          setNewUser(true);
          setUserCookie("userID", canonicalUserID, {path: '/'})
          setStepCookie("step", 0, {path: '/'})
          setStep(0)
        }
      }, [])

    //const [recordingData, setRecordingData] = useState(
      //  getRecordingData(scenerios, allScripts)
    //);
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
    const [pollingRetriesCount, setPollingRetriesCount] = useState<number>(0);
    const [hasUserConsentResearch, setHasUserConsentResearch] = useState<boolean>(false);
    const [hasUserConsentCommercial, setHasUserConsentCommercial] = useState<boolean>(false);
    const [allRecordingPageData, setAllRecordingPageData] = useState<Array<RecordingPageData>>([]);


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
    }

    const handlePrevStep = () => {
        if (step > 0) setStep(step - 1);
        setStepCookie("step", step - 1, {path: '/'})
    };

    const handleNextStep = async () => {
        if (onRecordingPage) {
            setShowSubmitAudioModal(true);
            return;
        }
        else if (step == STEP_PAGE.INFO_PAGE){
                const formatData = formatUserData(answers);
                await sendUserData(formatData);
        }
        if (step === -1) {
            setStepCookie("step", step + 2, {path: '/'})
            setStep(step + 2)
        } else if (step < MAX_PAGES) {
            setStepCookie("step", step + 1, {path: '/'})
            setStep(step + 1);
        } else if (step === MAX_PAGES-1) {
            setStepCookie("step", pages.length-1, {path: '/'})
            setStep(pages.length-1);
        }
    };

    const recordingPages = useMemo(() => phonePositions.map((phonePosition, idx) => {
        // @ts-ignore
        const script = scriptObj[getRandomIntInclusive(1, Object.keys(scriptObj).length)];
        // @ts-ignore
        const affect = affectObj[getRandomIntInclusive(1, Object.keys(affectObj).length)];
        setAllRecordingPageData(prevAllRecordingPageData => [
            ...prevAllRecordingPageData,
            {
                phoneposition: phonePosition,
                affect,
                script,
            }
        ]);
        return (
            <RecordingPage
                phonePosition={phonePosition}
                script={script}
                affect={affect}
            />
        )
    }), []);

    const removePreviousSessionCookies = () => {
        removeStepCookie('step');
        removeUserCookie('userID');
        setStep(0);
        setCanonicalUserID(`user_${uuid.v4()}`);
        setNewUser(true);
    };

    const resumePreviousSession = () => {
        setNewUser(true);
        if(parseInt(stepCookies.step, 10) >= questions.length + 2){
          setStep(parseInt(stepCookies.step, 10));
          setCanonicalUserID(userCookies.userID);
        } else {
            removeStepCookie('step');
            removeUserCookie('userID');
            setStep(0);
            const newUserID = `user_${uuid.v4()}`
            setCanonicalUserID(newUserID);
            setUserCookie("userID", newUserID, {path: '/'})
            setNewUser(true);    
        }
    };

    const pagesBeforeRecordingPages = [
        <ConsentPage
          hasUserConsentResearch={hasUserConsentResearch}
          setHasUserConsentResearch={setHasUserConsentResearch}
          hasUserConsentCommercial={hasUserConsentCommercial}
          setHasUserConsentCommercial={setHasUserConsentCommercial}
          setAnswer={setAnswer}
        />,
        ...questions.map((question, index) => (
            <QuestionsPage
                triggerAlert={displayMessageAlert}
                key={index}
                question={question}
                answers={answers}
                setAnswer={handleAnswerChange}
            />
        )),
        <InstructionsPage/>,
    ];

    const pagesAfterRecordingPages = [
        <ThankYouPage/>,
    ];

    const pages = [
        ...pagesBeforeRecordingPages,
        ...recordingPages,
        ...pagesAfterRecordingPages,
    ];

    const MAX_PAGES = pages.length - 1;

    const onRecordingPage =
        step === STEP_PAGE.FIRST_RECORDING ||
        (step > STEP_PAGE.FIRST_RECORDING && step <  MAX_PAGES);

    const processAudio = async (setDisableSubmit: Function) => {
        console.log(canonicalUserID)
        if (!recordingBlob) {
            setDisableSubmit(false);
            return;
        }
        try {
            const {
                phoneposition,
                affect,
                script,
            } = allRecordingPageData[step - pagesBeforeRecordingPages.length];
            console.log(`Before sending to S3: ${canonicalUserID}`);
            const fileID = await sendS3(recordingBlob, {
                userID: canonicalUserID,
                phoneposition,
                affect,
                script,
            });

            // for now only poll for the first audio
            if (step === STEP_PAGE.FIRST_RECORDING) {
                setAudioId(fileID);
            }
            setAlertMode(ALERT_MODE.SUCCESS);
            setRecordingBlob(undefined);
            setDisableSubmit(false);
        } catch (e) {
            console.log(e);
            setAlertMode(ALERT_MODE.FAILED);
            setDisableSubmit(false);
            //TESTING
            //setAlertMode(ALERT_MODE.SUCCESS);
            //console.error("RESETTING RECORDING BLOB EVEN THOUGH IT WAS NOT SUCCESSFUL, REMOVE IN PRODUCTION");
            //setRecordingBlob(undefined);
        }
        setDisableSubmit(false);
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
            if (audioId) {
                const response = await pollResults(audioId);
                if (response) {
                    setPollFlag(false);
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
        setStepCookie("step", step + 1, {path: '/'})
        setAlertMode(ALERT_MODE.INFORM);
    };

    const canGoToNext = () => {
        if (step === STEP_PAGE.CONSENT_PAGE) {
            return [hasUserConsentResearch, hasUserConsentCommercial];
        }
        if (
            step <= STEP_PAGE.QUESTION_END &&
            step >= STEP_PAGE.QUESTION_START
        ) {
            return userQuestionAnswerValid(
                answers,
                questions[step - STEP_PAGE.QUESTION_START]
            );
        }
        if (onRecordingPage) {
            return !!recordingBlob;
        }

        return true;
    };

    const showBackButton =
        step !== -1
        && step !== 0
        && step <= STEP_PAGE.FIRST_RECORDING

    const showNextButton =
        step !== -1 && step !== MAX_PAGES;

    const inputItem = () => {
        // this forces the recorder to re-render and restart all of its internal states
        if (step >= STEP_PAGE.FIRST_RECORDING && step !== MAX_PAGES) {
            return (
                <Recorder
                    key={step}
                    setRecordingBlob={setRecordingBlob}
                    displayMessageAlert={displayMessageAlert}
                />
            );
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
                {
                    !newUser
                    && (
                        <div>
                            <div>Do you want to resume where you left off?</div>
                            <Button onClick={resumePreviousSession}>Yes</Button>
                            <Button onClick={removePreviousSessionCookies}>No</Button>
                        </div>
                    )
                }
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
                            style={{
                                backgroundColor: "#7DBCFF",
                            }}
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
                            style={{
                                backgroundColor: "#7DBCFF",
                            }}
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
                    handleAgreeSubmit={(setDisableSubmit: Function) => processAudio(setDisableSubmit)}
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
        </>
    );
};
