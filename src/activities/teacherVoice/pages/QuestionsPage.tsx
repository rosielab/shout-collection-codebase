import { Container } from '@mui/material';
import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { routePaths } from '../../../commons/routes/routes';
import { FieldType } from '../components/fieldTypes/FieldType.component';

interface QuestionsPageProps {
    question: any;
    answers: any;
    setAnswer: (answer: any) => void;
    triggerAlert: (
        message: string,
        title?: string,
        cta?: () => void,
        buttonTitle?: string
    ) => void;
}

const AdditionalQuestionField = ({
    additionalQuestion,
    handleChange,
    getCurVal,
    answers,
}: any) => {
    const questionHasNoConditions = additionalQuestion?.condition === null;
    const questionConditionIsFullfilled =
        additionalQuestion?.condition?.answer ===
        answers[additionalQuestion?.condition?.key];
    const showAdditionalQuestion =
        questionHasNoConditions || questionConditionIsFullfilled;
    if (showAdditionalQuestion) {
        return (
            <FieldType
                handleChange={handleChange}
                getCurVal={getCurVal}
                key={additionalQuestion.key}
                question={additionalQuestion.question}
                answerKey={additionalQuestion.key}
                options={additionalQuestion.options}
                questionType={additionalQuestion.type}
                keysToClear={additionalQuestion?.clearIfChange}
            />
        );
    }
    return <></>;
};

export const QuestionsPage = ({
    question,
    answers,
    setAnswer,
    triggerAlert,
}: QuestionsPageProps) => {
    let history = useHistory();

    const goHome = useCallback(() => {
        history.push(routePaths.ACTIVITIES);
    }, [history]);

    const handleChange = (key: string, value: any, clearIfChange: any) => {
        // check if the question answered requires an alert
        if (
            question?.requireAlert &&
            question.requireAlert.condition === value
        ) {
            triggerAlert(
                question.requireAlert.message,
                question.requireAlert.title,
                goHome,
                'Go Home'
            );
        }
        const updatedAnswers = { [key]: value };
        if (clearIfChange) {
            // clear any answered follow up questions
            clearIfChange.forEach((key: number) => {
                updatedAnswers[key] = null;
            });
        }
        setAnswer({ ...answers, ...updatedAnswers });
    };

    const getCurVal = (key: string) => {
        return answers[key];
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <FieldType
                handleChange={handleChange}
                getCurVal={getCurVal}
                key={question.key}
                question={question.question}
                answerKey={question.key}
                options={question.options}
                questionType={question.type}
                keysToClear={question?.clearIfChange}
            />
            {question?.followUpQuestions &&
                question.followUpQuestions.map((additionalQuestion: any) => (
                    <AdditionalQuestionField
                        answers={answers}
                        handleChange={handleChange}
                        getCurVal={getCurVal}
                        key={additionalQuestion.key}
                        additionalQuestion={additionalQuestion}
                    />
                ))}
            {question?.showCheckboxOptional && (
                <FieldType
                    handleChange={handleChange}
                    getCurVal={getCurVal}
                    answerKey={question.key}
                    options={['Prefer not to disclose']}
                    questionType={'skipCheckbox'}
                    keysToClear={question?.clearIfChange}
                />
            )}
        </Container>
    );
};
