import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Button,
    Container,
    Grid,
    Tooltip,
    Typography,
} from '@mui/material';
import { BarChart } from '../components/charts/BarChart';
import {
    graphFeatureDescription,
    AudioFeatureResults,
    emptyUserResultData,
    AudioFeatureResultsKeys,
    featureStringMap,
} from '../helpers/extractedResults';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCallback, useState, useEffect } from 'react';
import { comparisonData } from '../helpers/comparisonData';

const InstructorInformation = () => {
    return (
        <Accordion sx={{ justifyContent: 'center', textAlign: 'center' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                    '& .MuiAccordionSummary-content': {
                        justifyContent: 'center',
                    },
                    backgroundColor: '#efe8e1',
                }}
            >
                <Typography sx={{ color: 'primary.dark' }}>
                    Click here to meet the instructors we’re comparing you to{' '}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {comparisonData.map((teacher, index) => {
                        return (
                            <Grid
                                key={index}
                                item
                                xs={12}
                                sm={6}
                                sx={{ display: 'flex' }}
                            >
                                <Avatar
                                    alt={teacher.name}
                                    src={teacher.image}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Typography>
                                        {teacher.description}
                                    </Typography>
                                    {teacher.photoCite}
                                </Container>
                            </Grid>
                        );
                    })}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

interface FeatureButtonsProps {
    selectedGraph: string;
    setSelectedGraph: (key: string) => void;
}
const FeatureButtons = ({
    selectedGraph,
    setSelectedGraph,
}: FeatureButtonsProps) => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexFlow: 'wrap',
                marginTop: 2,
            }}
        >
            {Object.entries(graphFeatureDescription).map(([key, value]) => {
                return (
                    <Button
                        key={key}
                        sx={{
                            marginLeft: 2,
                            '&:focus': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                            },
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                            },
                            ...(key === selectedGraph && {
                                color: 'white',
                                backgroundColor: 'primary.main',
                            }),
                        }}
                        onClick={() => setSelectedGraph(key)}
                    >
                        {value.name}
                    </Button>
                );
            })}
        </Container>
    );
};

interface ResultsPageProps {
    userData: AudioFeatureResults | null | undefined;
    handlePlayAgain: () => void;
    handleFailToGetResults: () => void;
}

export const ResultsPage = ({
    userData,
    handlePlayAgain,
    handleFailToGetResults,
}: ResultsPageProps) => {
    const [selectedGraph, setSelectedGraph] = useState<string>('pitchMean');
    const [shareTooltip, setShareTooltip] = useState(false);

    useEffect(() => {
        if (!userData) handleFailToGetResults();
    }, [handleFailToGetResults, userData]);

    const getUserData = useCallback(() => {
        return userData ? userData : emptyUserResultData;
    }, [userData]);

    const getLabels = () => {
        return ['You', ...comparisonData.map((comparison) => comparison.name)];
    };

    const getDataset = (selectedGraph: string) => {
        return [
            {
                label: selectedGraph,
                data: [
                    getUserData()[selectedGraph as AudioFeatureResultsKeys],
                    ...comparisonData.map(
                        (comparison) =>
                            comparison[
                                selectedGraph as AudioFeatureResultsKeys
                            ] ?? 0
                    ),
                ], //Gets all the Instructor Data for that graph
                backgroundColor: '#BC5D7F',
            },
        ];
    };

    const getFeatureExplanation = () => {
        return graphFeatureDescription[selectedGraph as string];
    };

    const getShareMessage = useCallback(() => {
        const results = getUserData();
        return `Checkout my results! Pitch Mean: ${results?.pitchMean} Pitch Range: ${results?.pitchRange} Pauses: ${results?.disconnect} Speech Rate: ${results?.speechRate}. Get your results today by trying https://citizen-audio.net/teacherVoice`;
    }, [getUserData]);

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(getShareMessage());
        setShareTooltip(true);
    }, [setShareTooltip, getShareMessage]);

    const tooltipLabelFormatter = (tooltipItems: any) => {
        return `${featureStringMap[tooltipItems.dataset.label]}: ${
            tooltipItems.formattedValue
        } ${getFeatureExplanation().units}`;
    };

    return (
        <Grid container spacing={2}>
            <Grid
                sx={{ justifyContent: 'center', textAlign: 'center' }}
                item
                sm={12}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Berkshire Swash', 'sans-serif'",
                        color: '#587a7f',
                    }}
                >
                    here are your results
                </Typography>
            </Grid>
            <Grid
                sx={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                }}
                item
                sm={12}
            >
                <InstructorInformation />
            </Grid>
            <FeatureButtons
                selectedGraph={selectedGraph}
                setSelectedGraph={setSelectedGraph}
            />
            <Grid item sm={12} sx={{ width: '100%' }}>
                <Container>
                    <Typography variant="h6" sx={{ color: 'primary.dark' }}>
                        {getFeatureExplanation().name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'primary.dark' }}>
                        {getFeatureExplanation().description}
                    </Typography>
                </Container>
                <BarChart
                    key={selectedGraph}
                    labels={getLabels()}
                    datasets={getDataset(selectedGraph)}
                    tooltipFormatter={tooltipLabelFormatter}
                />
            </Grid>
            <Grid
                sx={{ justifyContent: 'center', textAlign: 'center' }}
                item
                sm={12}
            >
                <Button
                    variant="outlined"
                    onClick={handlePlayAgain}
                    sx={{ marginRight: 2, marginBottom: 1 }}
                >
                    Play Again
                </Button>
                <Tooltip
                    arrow
                    open={shareTooltip}
                    onClose={() => setShareTooltip(false)}
                    title="You've copied your results! Share the url to your friends!"
                >
                    <Button
                        variant="contained"
                        onClick={handleShare}
                        sx={{ marginBottom: 1, backgroundColor: '#bc5d7f' }}
                    >
                        Share your results
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    );
};
