import { Button, Container, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

interface MessageAlertProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    message: string;
    title?: string;
    cta?: () => void;
    buttonTitle?: string;
}

export const MessageAlert = ({
    open,
    setOpen,
    message,
    title,
    cta,
    buttonTitle,
}: MessageAlertProps) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                {title && (
                    <Container sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                    </Container>
                )}
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions sx={{ padding: 2, justifyContent: 'center' }}>
                {cta && buttonTitle && (
                    <Button variant="contained" onClick={cta}>
                        {buttonTitle}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
