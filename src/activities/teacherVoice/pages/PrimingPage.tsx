import { Button, Grid, Typography } from '@mui/material';
import { AudioCard } from '../components/audioCard/AudioCard.component';
import { UserAnswersObject } from '../helpers/userAnswers';
import {
    AudioObject,
    AUDIO_GENDERS,
    INSTRUCTORL_QUALITY,
} from '../helpers/primingAudio';

interface PrimingPageProps {
    audioFiles: Array<AudioObject>;
    setAnswer: (answers: any) => void;
    answers: UserAnswersObject;
}
export const PrimingPage = ({
    answers,
    audioFiles,
    setAnswer,
}: PrimingPageProps) => {
    const buttonOptions = [
        'Audio A',
        'Audio B',
        'None',
        'Could not hear audio',
    ];

    const isSelected = (key: string) => {
        if (!answers.wouldYouRather.chosen) return false;
        const selectedAnswer = answers.wouldYouRather.chosen;
        switch (key) {
            case 'Audio A': {
                return selectedAnswer === audioFiles[0];
            }
            case 'Audio B': {
                return selectedAnswer === audioFiles[1];
            }
            case 'None': {
                return selectedAnswer.title === 'none';
            }
            case 'Could not hear audio': {
                return selectedAnswer.title === 'cannot hear';
            }
            default:
                return true;
        }
    };

    const noneObject: AudioObject = {
        file: 'none',
        citation: 'none',
        title: 'none',
        gender: AUDIO_GENDERS.FEMALE,
        level: INSTRUCTORL_QUALITY.NEUTRAL,
    };

    const cannotHearObject: AudioObject = {
        file: 'cannot hear',
        citation: 'cannot hear',
        title: 'cannot hear',
        gender: AUDIO_GENDERS.FEMALE,
        level: INSTRUCTORL_QUALITY.NEUTRAL,
    };

    const handleSelection = (key: string) => {
        switch (key) {
            case 'Audio A': {
                setAnswer({
                    ...answers,
                    wouldYouRather: {
                        chosen: audioFiles[0],
                        notChosen: audioFiles[1],
                    },
                });
                break;
            }
            case 'Audio B': {
                setAnswer({
                    ...answers,
                    wouldYouRather: {
                        chosen: audioFiles[1],
                        notChosen: audioFiles[0],
                    },
                });
                break;
            }
            case 'None': {
                setAnswer({
                    ...answers,
                    wouldYouRather: {
                        chosen: noneObject,
                        notChosen: audioFiles[0],
                    },
                });
                break;
            }
            case 'Could not hear audio': {
                setAnswer({
                    ...answers,
                    wouldYouRather: {
                        chosen: cannotHearObject,
                        notChosen: audioFiles[0],
                    },
                });
                break;
            }
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold">
                    Which one would you rather have as a teacher
                </Typography>
                <Typography variant="body1">
                    Watch the two videos and select your answer by clicking the
                    button
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AudioCard
                    key="Audio A"
                    title="Audio A"
                    soundfile={audioFiles[0].file.default}
                ></AudioCard>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AudioCard
                    key="Audio B"
                    title="Audio B"
                    soundfile={audioFiles[1].file.default}
                ></AudioCard>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 3 }}>
                <Typography variant="body1">
                    Select your answer by clicking the button
                </Typography>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{
                        justifyContent: 'flex-start',
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {buttonOptions.map((option) => (
                        <Button
                            variant="contained"
                            sx={{ margin: 1 }}
                            disabled={isSelected(option)}
                            onClick={(e) =>
                                handleSelection(
                                    (e.target as HTMLInputElement).value
                                )
                            }
                            value={option}
                            key={option}
                        >
                            {option}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
