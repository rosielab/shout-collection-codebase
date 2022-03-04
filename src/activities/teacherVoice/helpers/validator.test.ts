import { getUserAnswersDefaultState } from './userAnswers';
import { userQuestionAnswerValid } from './validator';

const questionKey = 'isFirstTimeParticipating';

const questionWithNoFollowUp = {
    question: 'Is this your first time participating the game on our website?',
    options: ['Yes', 'No'],
    type: 'radio',
    key: questionKey,
};

const questionWithConditionedFollowUp = {
    ...questionWithNoFollowUp,
    followUpQuestions: [
        {
            question: 'Self-Describe:',
            options: [''],
            type: 'text',
            key: 'describedIdentity',
            condition: {
                key: questionKey,
                answer: 'Prefer to self-describe',
            },
        },
    ],
};

const questionWithNoConditionedFollowUp = {
    ...questionWithNoFollowUp,
    followUpQuestions: [
        {
            question: 'Self-Describe:',
            options: [''],
            type: 'text',
            key: 'describedIdentity',
            condition: null,
        },
    ],
};

describe('userQuestionAnswerValid', () => {
    it('is an unanswered question with no follow-up questions', () => {
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            [questionKey]: null,
        };

        expect(
            userQuestionAnswerValid(answers, questionWithNoFollowUp)
        ).toEqual(false);
    });

    it('is an unanswered main question with follow-up unanswered questions', () => {
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            [questionKey]: null,
            [questionWithConditionedFollowUp.followUpQuestions[0].key]: null,
        };

        expect(
            userQuestionAnswerValid(answers, questionWithConditionedFollowUp)
        ).toEqual(false);
    });

    it('is an unanswered follow up question and answered main that meets follow up condition', () => {
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            [questionKey]:
                questionWithConditionedFollowUp.followUpQuestions[0].condition
                    .answer,
            [questionWithConditionedFollowUp.followUpQuestions[0].key]: null,
        };

        expect(
            userQuestionAnswerValid(answers, questionWithConditionedFollowUp)
        ).toEqual(false);
    });

    it("is an answered main question that doesn't meet follow up conditions", () => {
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            [questionKey]: 'answer',
            [questionWithConditionedFollowUp.followUpQuestions[0].key]: null,
        };

        expect(
            userQuestionAnswerValid(answers, questionWithConditionedFollowUp)
        ).toEqual(true);
    });

    it('is an answered follow up question and answered main question that meets the follow up conditions', () => {
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            [questionKey]:
                questionWithConditionedFollowUp.followUpQuestions[0].condition
                    .answer,
            [questionWithConditionedFollowUp.followUpQuestions[0].key]:
                'answered',
        };

        expect(
            userQuestionAnswerValid(answers, questionWithConditionedFollowUp)
        ).toEqual(true);
    });

    it('is an answered main question and answered followup question with no conditions ', () => {
        const answers = {
            ...getUserAnswersDefaultState('user_id'),
            [questionKey]: 'answer',
            [questionWithNoConditionedFollowUp.followUpQuestions[0].key]:
                'answered',
        };

        expect(
            userQuestionAnswerValid(answers, questionWithNoConditionedFollowUp)
        ).toEqual(true);
    });
});
