import { createTheme } from '@mui/material';

// Typescript module augmentation to allow for custom style not
// included in library theme (ie. neutral)
declare module '@mui/material/styles' {
    interface Theme {}

    interface Palette {
        neutral: Palette['primary'];
    }
    interface PaletteOptions {
        neutral: PaletteOptions['primary'];
    }
}

export const themedStyles = createTheme({
    palette: {
        primary: {
            light: '#7DBCFF',
            main: '#7DBCFF',
            dark: '#7DBCFF',
            contrastText: '#fff',
        },
        neutral: {
            light: '#7DBCFF',
            main: '#7DBCFF',
            dark: '#7DBCFF',
        },
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#7DBCFF',
                    '&:hover': {
                        backgroundColor: '#7DBCFF',
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#7DBCFF',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#7DBCFF',
                    },
                },
            },
        },
    },
});
