import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import RecordRTC from 'recordrtc';
import { rtcSettings } from './recorderSettings';
import Timer from './Timer.component';
import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import Tooltip from '@mui/material/Tooltip';

interface RecorderProps {
    setRecordingBlob: (blob: Blob) => void;
    displayMessageAlert: (message: string, title?: string) => void;
}

const overtimeMessage =
    'You have a limit of 1.5 minute to record the audio. Please give it another try if you were not able to finish. If you did, click next!';

const PauseButton = () => (
    <Tooltip title="Click to stop recording!" arrow>
        <PauseIcon
            style={{
                color: 'white',
                background: '#F16D6D',
                padding: 10,
                borderRadius: '50%',
            }}
        />
    </Tooltip>
);

const RecordButton = (props: any) => (
    <Tooltip title={props.message} arrow>
        <MicIcon
            style={{
                color: 'white',
                background: '#7DBCff',
                padding: 10,
                borderRadius: '50%',
            }}
        />
    </Tooltip>
);

export default function Recorder({
    setRecordingBlob,
    displayMessageAlert,
}: RecorderProps) {
    const [audio, setAudio] = useState<any>(null);
    const [recorder, setRecorder] = useState<RecordRTC>();
    const [url, setUrl] = useState<string>('');
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [showAudioHTML, setShowAudioHTML] = useState(false);
    const [timeStarted, setTimeStarted] = useState<number | null>(null);

    useEffect(() => {
        let interval: any = null;

        if (isActive && !isPaused && timeStarted) {
            interval = setInterval(() => {
                setTime((new Date().getTime() - timeStarted) / 1000);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, isPaused, timeStarted]);

    const handleStartTimer = () => {
        setIsActive(true);
        setIsPaused(false);
        setTimeStarted(new Date().getTime());
        setTime(0);
    };

    const handleResetTimer = () => {
        setIsActive(false);
    };

    const audioStopped = async (recorder: RecordRTC) => {
        if (!recorder) return;
        setUrl(recorder.toURL());
        let blob = await recorder.getBlob();
        setRecordingBlob(blob);
        setShowAudioHTML(true);
        handleResetTimer();
        if (audio.getTracks()) {
            // stop all the tracks for good measure
            audio.getTracks().forEach((track: any) => track.stop());
        }
        setAudio(null);
    };

    async function getMedia() {
        const constraints = { audio: true, video: false };

        try {
            let stream = await navigator.mediaDevices.getUserMedia(constraints);
            setAudio(stream);
            let rtc = new RecordRTC(stream, rtcSettings);
            handleStartTimer();

            // Limit in milliseconds
            let limit = 1500 * 60;
            rtc.setRecordingDuration(limit, function () {
                displayMessageAlert(overtimeMessage);
                rtc.stopRecording(() => {
                    audioStopped(rtc);
                });
            });

            rtc.startRecording();
            setRecorder(rtc);
        } catch (err) {
            if (err instanceof DOMException) {
                if (
                    err.name === 'NotFoundError' ||
                    err.name === 'DevicesNotFoundError'
                ) {
                    //required track is missing
                    displayMessageAlert(
                        'No microphone was found',
                        'You cannot record without a mic. We reccomend you plug in some headphones and try again'
                    );
                } else if (
                    err.name === 'NotReadableError' ||
                    err.name === 'TrackStartError'
                ) {
                    //webcam or mic are already in use
                    displayMessageAlert(
                        'Your microphone are already in use',
                        'You cannot record if your microphone is being used on another website or app. Please close that app and try again'
                    );
                } else if (
                    err.name === 'OverconstrainedError' ||
                    err.name === 'ConstraintNotSatisfiedError'
                ) {
                    //constraints can not be satisfied by avb. devices
                    displayMessageAlert(
                        'Please allow permission to use microphone',
                        'You cannot record the phrase without allowing permission to use the microphone.'
                    );
                } else if (
                    err.name === 'NotAllowedError' ||
                    err.name === 'PermissionDeniedError'
                ) {
                    //permission denied in browser
                    displayMessageAlert(
                        'Please allow permission to use microphone',
                        'You cannot record the phrase without allowing permission to use the microphone.'
                    );
                } else {
                    //other errors
                    displayMessageAlert(
                        'Something went wrong and you cannot use your microphone',
                        "You'll have to refresh the page and try again"
                    );
                }
            }
        }
    }

    const toggleMic = async () => {
        if (audio) {
            if (!recorder) return;
            recorder.stopRecording(() => {
                audioStopped(recorder);
            });
        } else {
            await getMedia();
            setShowAudioHTML(false);
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
            }}
        >
            <Button onClick={() => toggleMic()}>
                {audio ? (
                    <PauseButton />
                ) : (
                    <RecordButton
                        message={
                            url
                                ? 'Click to retry recording again'
                                : 'Click to record'
                        }
                    />
                )}
            </Button>
            {showAudioHTML && (
                <audio
                    style={{
                        width: '100%',
                        maxWidth: 300,
                    }}
                    src={url}
                    controls
                />
            )}
            {audio && <Timer time={time} />}
        </Container>
    );
}
