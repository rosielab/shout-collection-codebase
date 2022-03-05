import { ThemeProvider } from '@mui/material';
import { Wizard } from './components/Wizard.component';
import { themedStyles } from './themedStyles';

export const DontateShouts = () => {
    return (
        <ThemeProvider theme={themedStyles}>
            <Wizard></Wizard>
        </ThemeProvider>
    );
};
