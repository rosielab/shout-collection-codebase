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
            light: '#AAD1CB',
            main: '#95C6BE',
            dark: '#587A7F',
            contrastText: '#fff',
        },
        neutral: {
            light: '#efe8e1',
            main: '#C4C4C4',
            dark: '#616463',
        },
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f7fbff',
                    '&:hover': {
                        backgroundColor: '#f7fbff',
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#f7fbff',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#616463',
                    },
                },
            },
        },
    },
});
