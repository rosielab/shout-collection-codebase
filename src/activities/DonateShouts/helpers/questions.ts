interface FollowUpQuestion {
    condition: {
        key: string;
        answer: string;
    } | null;
}

interface AlertRequiredData {
    condition: string;
    message: string;
    title: string;
}

export interface UserQuestion {
    question: string;
    options: Array<string>;
    type: string;
    key: string;
    followUpQuestions?: Array<UserQuestion & FollowUpQuestion>;
    clearIfChange?: Array<string>;
    requireAlert?: AlertRequiredData;
    showCheckboxOptional?: boolean;
}

const AGE_RANGES = {
    UNDER_18: 'under 18',
    AGE_18_24: '18-24',
    AGE_25_39: '25-39',
    AGE_40_60: '40-60',
    AGE_60_OVER: '60 and over',
};

export const questions: Array<UserQuestion> = [
    {
        question: 'What is your age',
        options: [
            AGE_RANGES.UNDER_18,
            AGE_RANGES.AGE_18_24,
            AGE_RANGES.AGE_25_39,
            AGE_RANGES.AGE_40_60,
            AGE_RANGES.AGE_60_OVER,
        ],
        type: 'radio',
        key: 'age',
        requireAlert: {
            condition: AGE_RANGES.UNDER_18,
            title: "Unfortunately, you cannot participate if you're under 18",
            message:
                'Our website will have features in the feature for you to learn more about our discoveries. Check back later!',
        },
    },
    {
        question: 'What is your gender?',
        options: [
            'Man',
            'Woman',
            'Non-Binary',
            'Other',
            'Prefer not to disclose',
        ],
        type: 'radio',
        key: 'gender',
    },
    {
        question: 'What is the the first language you learned?',
        key: 'firstLanguage',
        options: [''],
        type: 'text',
    },
    {
        question: 'What language do you currently use most often?',
        key: 'currentLanguage',
        options: [''],
        type: 'text',
    },
    {
        question: 'What model of phone are you using?',
        key: 'phoneModel',
        options: [''],
        type: 'text',
    },
];
