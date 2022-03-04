import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { AudioCard } from '../components/audioCard/AudioCard.component';
import {
    DraggableInputItem,
    DraggableInput,
} from '../components/draggableInput/DraggableInput.component';
import { AudioObject } from '../helpers/primingAudio';
import { UserAnswersObject } from '../helpers/userAnswers';

interface PrimingRankingPageProps {
    audioFiles: Array<AudioObject>;
    setAnswer: (answers: any) => void;
    answers: UserAnswersObject;
}

export const PrimingRankingPage = ({
    audioFiles,
    answers,
    setAnswer,
}: PrimingRankingPageProps) => {
    const audios = [
        { title: 'Audio A', soundfile: audioFiles[0].file.default },
        { title: 'Audio B', soundfile: audioFiles[1].file.default },
        { title: 'Audio C', soundfile: audioFiles[2].file.default },
        { title: 'Audio D', soundfile: audioFiles[3].file.default },
    ];

    const defaultOrder = [
        { id: 'A', title: 'Audio A', data: audioFiles[0] },
        { id: 'B', title: 'Audio B', data: audioFiles[1] },
        { id: 'C', title: 'Audio C', data: audioFiles[2] },
        { id: 'D', title: 'Audio D', data: audioFiles[3] },
    ];

    const [items, setItems] = useState<DraggableInputItem[]>(
        answers.rankAudios ?? defaultOrder
    );

    const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));

    const handleChange = (newItems: DraggableInputItem[]) => {
        setItems(newItems);
        setAnswer({ ...answers, rankAudios: newItems });
    };

    return (
        <Container>
            <Typography variant="h5" fontWeight="bold">
                Watch the videos and order them from most to least engaging
            </Typography>
            <Grid
                container
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    flexWrap: matches ? 'nowrap' : 'wrap',
                }}
            >
                <Grid item xs={12} sm={3} sx={{ marginRight: 2 }}>
                    <Typography variant="body1">
                        Drag the boxes below to move them into the correct order
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'neutral.dark',
                            marginTop: 2,
                        }}
                    >
                        Most Engaging
                    </Typography>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{ justifyContent: 'flex-start', marginTop: 1 }}
                    >
                        <DraggableInput
                            items={items}
                            setItems={handleChange}
                        ></DraggableInput>
                    </Grid>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: 'neutral.dark',
                            marginTop: 2,
                        }}
                    >
                        Least Engaging
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Grid container sx={{ flexWrap: 'wrap' }} spacing={2}>
                        {audios.map((audio) => (
                            <Grid item key={audio.title} xs={12} sm={6}>
                                <AudioCard
                                    key={audio.title}
                                    title={audio.title}
                                    soundfile={audio.soundfile}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
