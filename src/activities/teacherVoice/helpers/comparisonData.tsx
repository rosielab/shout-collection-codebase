import { AudioFeatureResults } from './extractedResults';
import { Typography } from '@mui/material';
import hankGreen from '../assets/images/comparisonTeachers/hankGreen.jpeg';
import breneBrown from '../assets/images/comparisonTeachers/breneBrown.jpeg';
import billNye from '../assets/images/comparisonTeachers/billNye.jpeg';
import salKhan from '../assets/images/comparisonTeachers/salKhan.jpeg';

interface InstructorMetadata {
    name: string;
    audioLink: string;
    description: string;
    image: string;
    photoCite: JSX.Element;
}

type ComparisonData = InstructorMetadata & AudioFeatureResults;

export const comparisonData: Array<ComparisonData> = [
    {
        name: 'Sal Khan',
        pitchMean: 241.44,
        pitchRange: 298.28,
        disconnect: 4,
        speechRate: 0.9,
        audioLink: 'https://www.youtube.com/watch?v=0OtSs2xEpzY&t=34s',
        description:
            'Sal Khan is an educator that teaches a variety of subjects on Khan Academy, a platform that he founded.',
        image: salKhan,
        photoCite: (
            <Typography sx={{ fontSize: 10 }}>
                <a
                    href="https://commons.wikimedia.org/wiki/File:Salman_Khan_TED_2011.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Steve Jurvetson
                </a>
                ,{' '}
                <a href="https://creativecommons.org/licenses/by/2.0">
                    CC BY 2.0
                </a>
                , via Wikimedia Commons
            </Typography>
        ),
    },
    {
        name: 'Bill Nye',
        pitchMean: 142.94,
        pitchRange: 519.89,
        disconnect: 15,
        speechRate: 2.47,
        audioLink: 'https://www.youtube.com/watch?v=F-Atrlz-cSI&t=30s',
        description:
            'Bill Nye is the host of the television show Bill Nye the Science Guy. Through this series, he teaches viewers scientific concepts in an engaging and simple way.',
        image: billNye,
        photoCite: (
            <Typography sx={{ fontSize: 10 }}>
                <a
                    href="https://commons.wikimedia.org/wiki/File:Bill_Nye_(39998969183)_(cropped).jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Christopher Michel from San Francisco, USA
                </a>
                ,{' '}
                <a
                    href="https://creativecommons.org/licenses/by/2.0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CC BY 2.0
                </a>
                , via Wikimedia Commons
            </Typography>
        ),
    },
    {
        name: 'Brené Brown',
        pitchMean: 159.12,
        pitchRange: 511.41,
        disconnect: 25,
        speechRate: 2.73,
        audioLink: 'https://www.youtube.com/watch?v=iCvmsMzlF7o&t=128s',
        description:
            'Brené Brown is a professor with the focus of teaching and studying topics on courage, vulnerability, shame and empathy. She discusses these topics through many ted talks and her documentary “Brené Brown: The Call to Courage”.',
        image: breneBrown,
        photoCite: (
            <Typography sx={{ fontSize: 10 }}>
                <a
                    href="https://commons.wikimedia.org/wiki/File:Bren%C3%A9_Brown_Wikipedia.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    BBeargTeam
                </a>
                ,{' '}
                <a
                    href="https://creativecommons.org/licenses/by-sa/4.0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CC BY-SA 4.0
                </a>
                , via Wikimedia Commons
            </Typography>
        ),
    },
    {
        name: 'Hank Green',
        pitchMean: 153.33,
        pitchRange: 494.68,
        disconnect: 18,
        speechRate: 1.91,
        audioLink: 'https://www.youtube.com/watch?v=hFV71QPvX2I&t=37s',
        description:
            'Hank Green is the host of the youtube series Crash Course, where he educates his viewers on many science concepts with a focus on the high school curriculum. ',
        image: hankGreen,
        photoCite: (
            <Typography sx={{ fontSize: 10 }}>
                <a
                    href="https://commons.wikimedia.org/wiki/File:Hank_Green_Vlogbrothers_2016.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Photo Credit: User of the Vlogbrothers YouTube channel
                    (https://www.youtube.com/user/vlogbrothers/)
                </a>
                ,{' '}
                <a
                    href="https://creativecommons.org/licenses/by/3.0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CC BY 3.0
                </a>
                , via Wikimedia Commons
            </Typography>
        ),
    },
];
