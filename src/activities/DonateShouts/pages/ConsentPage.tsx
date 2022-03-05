import {
    Checkbox,
    Container,
    FormControlLabel,
    Typography,
} from '@mui/material';
import { consentInfo } from '../helpers/consentInfo';

interface ConsentPageProps {
    hasUserConsentResearch: boolean;
    setHasUserConsentResearch: (hasUserConsentResearch: boolean) => void;
    hasUserConsentCommercial: boolean;
    setHasUserConsentCommercial: (hasUserConsentCommercial: boolean) => void;
}

export const ConsentPage = ({
    hasUserConsentResearch,
    setHasUserConsentResearch,
    hasUserConsentCommercial,
    setHasUserConsentCommercial,
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
              We are collecting emotional shout data to help us better detect this
              behavious in order to improve the saftery of those living with intimate
              partner violence.
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
                            onChange={(e) =>
                                setHasUserConsentResearch(e.target.checked)
                            }
                            checked={hasUserConsentResearch}
                        />
                    }
                    label="I have read and accept the consent form and would like to include my data for Research Purposes"
                />
             </Container>

             <Container>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={(e) =>
                                setHasUserConsentCommercial(e.target.checked)
                            }
                            checked={hasUserConsentCommercial}
                        />
                    }
                    label="I have read and accept the consent form and would like to include my data for Non Haiven Commercial Purposes"
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
                        You will have to accept at least one option and read the consent form to
                        participate.
                    </Typography>
                )}
            </Container>
        </Container>
    );
};