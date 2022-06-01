import { UserAnswersObject, UserAnswersObjectKeys } from './userAnswers';
import { UserQuestion } from './questions';
import { InputValidateOptions } from '../components/fieldTypes/FieldType.component';

export const areStringAnswerRequirementsMet = (
    value: string,
    validation?: InputValidateOptions
) => {
    // If a value doesn't have a validation associated with it, it is automatically true
    if (!validation) {
        return true;
    }

    if (validation?.pattern && validation?.maxLength) {
        return (
            new RegExp(validation.pattern, 'i').test(value) &&
            (value || '').length < validation.maxLength
        );
    }

    if (validation?.pattern) {
        return new RegExp(validation.pattern, 'i').test(value);
    }

    if (validation?.maxLength) {
        return (value || '').length <= validation.maxLength;
    }

    return true;
};


export const userQuestionAnswerValid = (
    answers: UserAnswersObject,
    curQuestions: UserQuestion
) => {
    // Blocking currently only occurs on main questions
    const isQuestionBlocked =
        curQuestions?.requireAlert &&
        curQuestions.requireAlert.condition ===
            answers[curQuestions.key as UserAnswersObjectKeys];
    if (isQuestionBlocked) return false;

    // If main question is answered and has no follow up questions
    const followUpQuestions: Array<any> | undefined =
        curQuestions?.followUpQuestions;
    const isMainQuestionAnswered =
        !!answers[curQuestions.key as UserAnswersObjectKeys];
    if (!followUpQuestions) return isMainQuestionAnswered;

    // If there are follow up questions, check if they meet the conditions
    // to move on
    const areFollowUpQuestionsAnswered = followUpQuestions.every(
        (question: any) => {
            const isFollowUpQuestionAnswered =
                !!answers[question.key as UserAnswersObjectKeys];
            if (question.condition === null) {
                return isFollowUpQuestionAnswered;
            } else {
                const conditionsAreMet =
                    answers[question.condition.key as UserAnswersObjectKeys] ===
                    question.condition.answer;

                if (conditionsAreMet) {
                    return isFollowUpQuestionAnswered;
                }
                // if conditions aren't met then question is doesn't have to be answered
                return true;
            }
        }
    );

    return isMainQuestionAnswered && areFollowUpQuestionsAnswered;
};
