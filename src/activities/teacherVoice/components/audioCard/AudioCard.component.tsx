import { Card, CardActions, IconButton, Typography } from '@mui/material';
import { Waveform } from '../waveform/Waveform.component';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { useCallback, useState } from 'react';

interface AudioCardProps {
    title: string;
    soundfile: string;
}

enum AudioState {
    Play,
    Pause,
}

export const AudioCard = ({ title, soundfile }: AudioCardProps) => {
    const [audioState, setAudioState] = useState(AudioState.Pause);

    const playAudio = useCallback(() => {
        setAudioState(AudioState.Play);
    }, []);

    const pauseAudio = useCallback(() => {
        setAudioState(AudioState.Pause);
    }, []);

    const PlayButton = () => (
        <IconButton onClick={playAudio}>
            <PlayCircleFilledIcon />
        </IconButton>
    );

    const PauseButton = () => (
        <IconButton onClick={pauseAudio}>
            <PauseCircleIcon />
        </IconButton>
    );

    const audioFinished = useCallback(() => {
        pauseAudio();
    }, [pauseAudio]);

    return (
        <Card sx={{ backgroundColor: 'black' }}>
            <Waveform
                url={soundfile}
                isPlaying={audioState === AudioState.Play}
                audioFinished={audioFinished}
            />
            <CardActions
                disableSpacing
                sx={{
                    backgroundColor: 'primary.dark',
                    color: 'white',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
            >
                <Typography fontWeight="500">{title}</Typography>
                {audioState === AudioState.Pause ? (
                    <PlayButton />
                ) : (
                    <PauseButton />
                )}
            </CardActions>
        </Card>
    );
};
