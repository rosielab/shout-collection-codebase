import {
    Checkbox,
    Container,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { UserAnswersObject } from '../helpers/userAnswers';
import { consentInfo } from '../helpers/consentInfo';

interface ConsentPageProps {
    hasUserConsentResearch: boolean;
    setHasUserConsentResearch: (hasUserConsentResearch: boolean) => void;
    hasUserConsentCommercial: boolean;
    setHasUserConsentCommercial: (hasUserConsentCommercial: boolean) => void;
    setAnswer: (callback: any) => void;
}

export const ConsentPage = ({
    hasUserConsentResearch,
    setHasUserConsentResearch,
    hasUserConsentCommercial,
    setHasUserConsentCommercial,
    setAnswer,
}: ConsentPageProps) => {
    return (
        <Container>
            <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: 3 }}
            >
                Shouting Data Collection
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Researchers at Simon Fraser University are collecting emotional shout 
                data to help us better detect this behaviour in order to improve detection 
                of shouts for multiple uses including robotic assistants and improving the lives 
                of those living with intimate partner violence.
            </Typography>
            <Typography sx={{ marginBottom: 3 }}>
                <b>
                    Before participating in this study please read the following
                    information.
                </b>
            </Typography>
            {consentInfo.map((info, index) => {
                return (
                    <Container key={index}>
                        <Typography
                            key={`title-${index}`}
                            variant="h5"
                            sx={{ fontWeight: 'bold', marginBottom: 1 }}
                        >
                            {info.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: 3 }}
                            key={`body-${index}`}
                        >
                            {info.body}
                        </Typography>
                    </Container>
                );
            })}

            <Container>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) => {
                                setAnswer((oldAnswer: UserAnswersObject) => {
                                    return {
                                        ...oldAnswer,
                                        consentcommercial: e.target.checked,
                                    };
                                });
                                setHasUserConsentCommercial(e.target.checked);
                            }}
                            checked={hasUserConsentCommercial}
                        />
                    }
                    label="I have read and accept the consent form"
                />

                {!hasUserConsentResearch && !hasUserConsentCommercial && (
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: 1,
                            color: 'red',
                        }}
                    >
                        You will have to accept at least one option and read the
                        consent form to participate.
                    </Typography>
                )}
            </Container>
        </Container>
    );
};
