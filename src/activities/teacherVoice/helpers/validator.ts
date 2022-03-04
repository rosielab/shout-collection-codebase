import { UserAnswersObject, UserAnswersObjectKeys } from './userAnswers';
import { UserQuestion } from './questions';

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
