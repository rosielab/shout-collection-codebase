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
            light: '#db848f',
            main: '#db848f',
            dark: '#db848f',
            contrastText: '#fff',
        },
        neutral: {
            light: '#db848f',
            main: '#db848f',
            dark: '#db848f',
        },
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#db848f',
                    '&:hover': {
                        backgroundColor: '#db848f',
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#db848f',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#db848f',
                    },
                },
            },
        },
    },
});
