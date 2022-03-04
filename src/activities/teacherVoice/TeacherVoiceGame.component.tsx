import { ThemeProvider } from '@mui/material';
import { Wizard } from './components/Wizard.component';
import { themedStyles } from './themedStyles';

export const TeacherVoiceGame = () => {
    return (
        <ThemeProvider theme={themedStyles}>
            <Wizard></Wizard>
        </ThemeProvider>
    );
};
