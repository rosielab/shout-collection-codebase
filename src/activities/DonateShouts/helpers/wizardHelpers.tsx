import { questions } from './questions';

export enum STEP_PAGE {
    CONSENT_PAGE = 0,
    QUESTION_START = 1,
    QUESTION_END = questions.length,
    INFO_PAGE = questions.length + 1,
    FIRST_RECORDING = STEP_PAGE.INFO_PAGE + 1,
}