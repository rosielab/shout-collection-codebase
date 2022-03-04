import { countries } from './countries';

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

const NOISE_LEVELS = {
    VERY_NOISY:
        'Very Noisy - large public area like a mall or lecture hall with more than 4 people nearby talking',
    SLIGHTLY_NOISY:
        'Slightly noisy - small public area like a coffee shop with less than 4 people nearby talking',
    QUIET: 'Quiet - Little to no sound anywhere in your near surroundings',
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
        question:
            'Please indicate the noise level of your current surroundings.',
        options: [
            NOISE_LEVELS.VERY_NOISY,
            NOISE_LEVELS.SLIGHTLY_NOISY,
            NOISE_LEVELS.QUIET,
        ],
        type: 'radio',
        key: 'noiseLevel',
        requireAlert: {
            condition: NOISE_LEVELS.VERY_NOISY,
            title: 'It is not reccommended to continue in a noisy surrounding!',
            message:
                "Try again when you're in a quiet surrounding. You will not be able to get accurate results with a noisy surrounding.",
        },
    },
    {
        question: 'What kind of microphone are you using right now?',
        options: ['Computer', 'Headphones microphone', 'Cellphone microphone'],
        type: 'radio',
        key: 'mic',
    },
    {
        question:
            'Is this your first time participating the game on our website?',
        options: ['Yes', 'No'],
        type: 'radio',
        key: 'isFirstTimeParticipating',
    },
    {
        question: 'What is your gender?',
        options: ['Male', 'Female', 'Prefer not to disclose'],
        type: 'radio',
        key: 'gender',
        followUpQuestions: [
            {
                question: 'How do you identify?',
                options: [
                    'Man',
                    'Woman',
                    'Non-Binary',
                    'Prefer to self-describe',
                    'Prefer not to disclose',
                ],
                type: 'radio',
                condition: null,
                key: 'genderIdentity',
                clearIfChange: ['describedIdentity'],
            },
            {
                question: 'Self-Describe:',
                options: [''],
                type: 'text',
                key: 'describedIdentity',
                condition: {
                    key: 'genderIdentity',
                    answer: 'Prefer to self-describe',
                },
            },
        ],
    },
    {
        question: 'Is English your first language?',
        options: ['Yes', 'No'],
        type: 'radio',
        key: 'isEnglishFirstLanguage',
        clearIfChange: ['firstLanguage'],
        followUpQuestions: [
            {
                question:
                    'If English is not your first language, what is your first language?',
                options: [''],
                type: 'text',
                key: 'firstLanguage',
                condition: {
                    key: 'isEnglishFirstLanguage',
                    answer: 'No',
                },
            },
        ],
    },
    {
        question: 'What is your proficiency in English?',
        options: [
            'Elementary Proficiency',
            'Limited Working Proficiency',
            'Professional Working Proficiency',
            'Full Professional Proficiency',
            'Native / Bilingual Proficiency',
            'Prefer not to disclose',
        ],
        type: 'radio',
        key: 'englishProficiency',
    },
    {
        question: 'What is your highest level of education?',
        options: [
            'Elementary school',
            'High school or equivalent',
            'Equivalency diploma (GED)',
            'Technical or occupational certificate',
            'Associate degree',
            'Some college coursework completed',
            "Bachelor's degree",
            "Master's degree",
            'Doctorate',
            'Prefer not to disclose',
        ],
        type: 'radio',
        key: 'educationLevel',
    },
    {
        question: 'How experienced are you in public speaking?',
        options: [
            'Novice',
            'Advanced beginner',
            'Competent',
            'Proficient',
            'Expert',
        ],
        type: 'radio',
        key: 'publicSpeakingExperience',
    },
    {
        question: 'What is your country of birth?',
        options: countries,
        type: 'searchSelect',
        key: 'countryOfBirth',
        showCheckboxOptional: true,
    },
    {
        question: 'What country are you located in right now',
        options: countries,
        type: 'searchSelect',
        key: 'currentLocation',
        showCheckboxOptional: true,
    },
];
