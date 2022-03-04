import { Citation } from '../components/citation/Citation.component';
import { getRandomIndex } from './generalHelpers';

const AUD_A1 = require('../assets/audioSnippets/AUD_A1.mp3');
const AUD_A3 = require('../assets/audioSnippets/AUD_A3.mp3');
const AUD_A4 = require('../assets/audioSnippets/AUD_A4.mp3');
const AUD_A5 = require('../assets/audioSnippets/AUD_A5.mp3');
const AUD_A6 = require('../assets/audioSnippets/AUD_A6.mp3');
const AUD_A7 = require('../assets/audioSnippets/AUD_A7.mp3');
const AUD_A8 = require('../assets/audioSnippets/AUD_A8.mp3');
const AUD_A9 = require('../assets/audioSnippets/AUD_A9.mp3');
const AUD_A10 = require('../assets/audioSnippets/AUD_A10.mp3');
const AUD_A11 = require('../assets/audioSnippets/AUD_A11.mp3');
const AUD_A12 = require('../assets/audioSnippets/AUD_A12.mp3');
const AUD_B1 = require('../assets/audioSnippets/AUD_B1.mp3');

export enum INSTRUCTORL_QUALITY {
    GOOD,
    NEUTRAL,
    BAD,
}

export enum AUDIO_GENDERS {
    FEMALE,
    MALE,
}

export interface AudioObject {
    file: any;
    citation: JSX.Element | string;
    title: string;
    gender: AUDIO_GENDERS;
    level: INSTRUCTORL_QUALITY;
}

interface PrimingAudio {
    neutral: Array<AudioObject>;
    good: Array<AudioObject>;
    bad: Array<AudioObject>;
}

export const getWouldYouRatherAudios = (primingAudio: PrimingAudio) => {
    const audioCatories = Object.values(primingAudio);
    const randomCatagory = audioCatories[getRandomIndex(audioCatories.length)];
    // get all indexes in that category
    const possibleIndexes = Array.from(Array(randomCatagory.length).keys());
    const locationIndex = getRandomIndex(possibleIndexes.length);

    const firstIndex = possibleIndexes[locationIndex];
    // remove from list of possible index to avoid duplication
    possibleIndexes.splice(locationIndex, 1);
    const secondIndex = possibleIndexes[getRandomIndex(possibleIndexes.length)];

    return [randomCatagory[firstIndex], randomCatagory[secondIndex]];
};

export const getRankingAudios = (primingAudio: PrimingAudio) => {
    const neutralIndex = getRandomIndex(primingAudio.neutral.length);
    const badIndex = getRandomIndex(primingAudio.bad.length);
    const goodIndex = getRandomIndex(primingAudio.good.length);

    const audioCatories = Object.values(primingAudio);
    const randomCatagory = getRandomIndex(audioCatories.length);
    let randomAudio;

    // Gets random audio that isn't the same as the already selected
    do {
        const randomIndex = getRandomIndex(
            audioCatories[randomCatagory].length
        );
        randomAudio = audioCatories[randomCatagory][randomIndex];
    } while (
        randomAudio.title === primingAudio.neutral[neutralIndex].title ||
        randomAudio.title === primingAudio.bad[badIndex].title ||
        randomAudio.title === primingAudio.good[goodIndex].title
    );

    return [
        primingAudio.neutral[neutralIndex],
        primingAudio.bad[badIndex],
        primingAudio.good[goodIndex],
        randomAudio,
    ];
};

export const primingAudio: PrimingAudio = {
    neutral: [
        {
            file: AUD_A1,
            title: 'The Physics of Dark Matter',
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.NEUTRAL,
            citation: (
                <Citation
                    title={'“The Physics of Dark Matter“'}
                    titleLink={'https://youtu.be/J5vcAZoxhAc'}
                    author={
                        'Lecture 1 by ICTP High Energy, Cosmology and Astroparticle Physicsis licensed'
                    }
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_B1,
            title: 'Teaching a Letter and its Sounds',
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.NEUTRAL,
            citation: (
                <Citation
                    title={'“Teaching a Letter and its Sounds”'}
                    titleLink={'https://www.youtube.com/watch?v=dLY3bn7B8AA'}
                    author={'Teach for Life'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A4,
            title: "People's Way of Life: Foods",
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.NEUTRAL,
            citation: (
                <Citation
                    title={"“People's Way of Life: Food”"}
                    titleLink={
                        'https://www.youtube.com/watch?v=91Lu_H3n5Bw&list=PLLEOr869Oy7gx-ajMBnMX1RbBtSVUAMQK'
                    }
                    author={'Teach for Life'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A12,
            title: "What's your English Listening like",
            gender: AUDIO_GENDERS.MALE,
            level: INSTRUCTORL_QUALITY.NEUTRAL,
            citation: (
                <Citation
                    title={"“What's your English Listening like”"}
                    titleLink={'https://youtu.be/Z7YM5zc8Y4I?t=18'}
                    author={'Development Talk'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A9,
            title: 'CS50 Lecture',
            gender: AUDIO_GENDERS.MALE,
            level: INSTRUCTORL_QUALITY.NEUTRAL,
            citation: (
                <Citation
                    title={'“CS50 Lecture”'}
                    titleLink={'https://youtu.be/xFFs9UgOAlE?t=1691'}
                    author={'CS50'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
    ],
    bad: [
        {
            file: AUD_A7,
            title: 'Presentation',
            gender: AUDIO_GENDERS.MALE,
            level: INSTRUCTORL_QUALITY.BAD,
            citation: (
                <Citation
                    title={'“Presentation”'}
                    titleLink={'https://www.youtube.com/watch?v=V8eLdbKXGzk'}
                    author={'Project IDEA'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A8,
            title: 'Imagism',
            gender: AUDIO_GENDERS.MALE,
            level: INSTRUCTORL_QUALITY.BAD,
            citation: (
                <Citation
                    title={'“Imagism”'}
                    titleLink={'https://www.youtube.com/watch?v=2gU4F6ePhcM'}
                    author={'YaleCourses'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A10,
            title: 'Derivative Delights and Oligarch Feuds',
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.BAD,
            citation: (
                <Citation
                    title={'“Derivative Delights and Oligarch Feuds”'}
                    titleLink={'https://youtu.be/PngZtkBHo4c?t=92'}
                    author={'Cambridge Law Faculty'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A11,
            title: 'Derivative Delights and Oligarch Feuds',
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.BAD,
            citation: (
                <Citation
                    title={'“Derivative Delights and Oligarch Feuds”'}
                    titleLink={'https://youtu.be/PngZtkBHo4c?t=92'}
                    author={'Cambridge Law Faculty'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
    ],
    good: [
        {
            file: AUD_A5,
            title: 'How to Start a Startup',
            gender: AUDIO_GENDERS.MALE,
            level: INSTRUCTORL_QUALITY.GOOD,
            citation: (
                <Citation
                    title={'“How to Start a Startup”'}
                    titleLink={'https://youtu.be/CBYhVcO4WgI?t=181'}
                    author={'Sam Altman & Dustin Moskovitz'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A6,
            title: 'Culturally Responsive Teaching and the UDL Connection',
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.GOOD,
            citation: (
                <Citation
                    title={
                        '“Culturally Responsive Teaching and the UDL Connection”'
                    }
                    titleLink={'https://youtu.be/NFfqgxTCSG4?t=190'}
                    author={'UDL IRN'}
                    license={'CC BY 2.0'}
                    licenseLink={'https://creativecommons.org/licenses/by/2.0/'}
                />
            ),
        },
        {
            file: AUD_A3,
            title: 'Sleep Paralysis and Dreams',
            gender: AUDIO_GENDERS.MALE,
            level: INSTRUCTORL_QUALITY.GOOD,
            citation: (
                <Citation
                    title={'“Sleep Paralysis and Dreams”'}
                    titleLink={'https://youtu.be/m0g7W_fVW-Y'}
                    author={'Dr. Baland Jalal '}
                    license={'CC BY-SA 3.0'}
                    licenseLink={
                        'https://creativecommons.org/licenses/by-sa/3.0/'
                    }
                />
            ),
        },
    ],
};
