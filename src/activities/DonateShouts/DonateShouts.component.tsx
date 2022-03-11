import { useState } from 'react';
import * as uuid from 'uuid';
import { ThemeProvider } from '@mui/material';
import { Wizard } from './components/Wizard.component';
import { themedStyles } from './themedStyles';

export const DontateShouts = () => {
    const [canonicalUserID, setCanonicalUserID] = useState(`user_${uuid.v4()}`);
    return (
        <ThemeProvider theme={themedStyles}>
            <Wizard
                canonicalUserID={canonicalUserID}
                setCanonicalUserID={setCanonicalUserID}
            ></Wizard>
        </ThemeProvider>
    );
};
