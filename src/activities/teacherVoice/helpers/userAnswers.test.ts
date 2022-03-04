import { AUDIO_GENDERS, INSTRUCTORL_QUALITY } from './primingAudio';
import { formatUserData, getUserAnswersDefaultState } from './userAnswers';

describe('formatUserData', () => {
    it('formats all null answers', () => {
        const defaultAnswers = getUserAnswersDefaultState('user_id');
        const expectedFormattedAnswers = {
            ...defaultAnswers,
            wouldYouRather: {
                chosen: undefined,
                notChosen: undefined,
            },
            rankAudios: null,
        };
        expect(formatUserData(defaultAnswers)).toEqual(
            expectedFormattedAnswers
        );
    });

    it('formats all answers', () => {
        const audioObject = {
            file: '',
            citation: '',
            title: '',
            gender: AUDIO_GENDERS.FEMALE,
            level: INSTRUCTORL_QUALITY.BAD,
        };
        const draggableInput = {
            id: '',
            title: '',
        };
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            wouldYouRather: {
                chosen: { ...audioObject, title: 'a' },
                notChosen: { ...audioObject, title: 'b' },
            },
            rankAudios: [{ ...draggableInput, title: 'a' }],
        };
        const expectedFormattedAnswers = {
            ...answers,
            wouldYouRather: {
                chosen: answers.wouldYouRather.chosen.title,
                notChosen: answers.wouldYouRather.notChosen.title,
            },
            rankAudios: answers.rankAudios.map((audio) => audio.title),
        };
        expect(formatUserData(answers)).toEqual(expectedFormattedAnswers);
    });
});
