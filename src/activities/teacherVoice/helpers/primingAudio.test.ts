import {
    AudioObject,
    AUDIO_GENDERS,
    getRankingAudios,
    getWouldYouRatherAudios,
    INSTRUCTORL_QUALITY,
} from './primingAudio';

const audioFile: AudioObject = {
    file: 'file',
    citation: 'citation',
    title: 'title',
    gender: AUDIO_GENDERS.FEMALE,
    level: INSTRUCTORL_QUALITY.GOOD,
};

const generateAudios = (
    numAudios: number,
    instructorLevel: INSTRUCTORL_QUALITY,
    titlePrefix: string
) => {
    const audios: Array<AudioObject> = [];
    for (let i = 0; i < numAudios; i++) {
        audios.push({
            ...audioFile,
            title: `${titlePrefix}_${i}`,
            level: instructorLevel,
        });
    }
    return audios;
};

describe('getWouldYouRatherAudios', () => {
    it('is different audios and has the same instructor type', () => {
        const primingAudio = {
            neutral: [
                ...generateAudios(2, INSTRUCTORL_QUALITY.NEUTRAL, 'Neutral'),
            ],
            good: [...generateAudios(2, INSTRUCTORL_QUALITY.GOOD, 'Good')],
            bad: [...generateAudios(2, INSTRUCTORL_QUALITY.BAD, 'Bad')],
        };

        const result = getWouldYouRatherAudios(primingAudio);

        expect(result[0].level).toEqual(result[1].level);
        expect(result[0].title).not.toMatch(result[1].title);
    });
});

describe('getRankingAudios', () => {
    it('is different audios and has one of each instructor level', () => {
        const primingAudio = {
            neutral: [
                ...generateAudios(2, INSTRUCTORL_QUALITY.NEUTRAL, 'Neutral'),
            ],
            good: [...generateAudios(2, INSTRUCTORL_QUALITY.GOOD, 'Good')],
            bad: [...generateAudios(2, INSTRUCTORL_QUALITY.BAD, 'Bad')],
        };

        const results = getRankingAudios(primingAudio);

        expect(results).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ level: INSTRUCTORL_QUALITY.BAD }),
                expect.objectContaining({ level: INSTRUCTORL_QUALITY.GOOD }),
                expect.objectContaining({ level: INSTRUCTORL_QUALITY.NEUTRAL }),
            ])
        );

        // casting to a set, doesn't save any duplicats
        // so if the size/length don't equal then there are duplicates
        const isArrayUnique = (arr: Array<AudioObject>) =>
            Array.isArray(arr) && new Set(arr).size === arr.length;

        expect(isArrayUnique(results)).toBeTruthy();
    });
});
