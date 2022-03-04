import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export enum ALERT_MODE {
    SUCCESS,
    FAILED,
    LOADING,
    INFORM,
}

interface SubmitAlertProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    handleAgreeSubmit: () => void;
    alertMode: ALERT_MODE;
    handleClose: () => void;
}

export const SubmitAlert = ({
    open,
    setOpen,
    handleAgreeSubmit,
    alertMode,
    handleClose,
}: SubmitAlertProps) => {
    const isLoadingModal = alertMode === ALERT_MODE.LOADING;
    const showCancelButton = alertMode === ALERT_MODE.INFORM;

    const content = () => {
        switch (alertMode) {
            case ALERT_MODE.SUCCESS:
                return '';
            case ALERT_MODE.FAILED:
                return 'Something went wrong. Give it another try';
            case ALERT_MODE.INFORM:
                return 'You will not be able to go back to the previous questions if you click yes. We have to process your audio in order to retrieve your results.';
            default:
                return '';
        }
    };

    const title = () => {
        switch (alertMode) {
            case ALERT_MODE.SUCCESS:
                return 'Audio has been successfully submitted for processing!';
            case ALERT_MODE.FAILED:
                return 'Audio has been failed to submitted for processing!';
            case ALERT_MODE.INFORM:
                return 'Are you sure you want to submit this audio?';
            case ALERT_MODE.LOADING:
                return 'Hold on, we are submitting your audio for processing';
            default:
                return '';
        }
    };

    const buttonText = () => {
        switch (alertMode) {
            case ALERT_MODE.SUCCESS:
                return 'Close';
            case ALERT_MODE.FAILED:
                return 'Try Again';
            case ALERT_MODE.INFORM:
                return 'Submit';
            default:
                return '';
        }
    };

    const handleCta = () => {
        switch (alertMode) {
            case ALERT_MODE.SUCCESS:
                return handleClose();
            case ALERT_MODE.FAILED:
                return handleAgreeSubmit();
            case ALERT_MODE.INFORM:
                return handleAgreeSubmit();
            default:
                return;
        }
    };

    const handleExit = () => {
        // should not be able to exit when loading
        if (alertMode === ALERT_MODE.LOADING) return;
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleExit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"> {title()} </DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
                {isLoadingModal ? (
                    <CircularProgress />
                ) : (
                    <DialogContentText> {content()} </DialogContentText>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
                {showCancelButton && (
                    <Button
                        sx={{ color: 'neutral.dark', marginRight: 1 }}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                )}
                {!isLoadingModal && (
                    <Button
                        variant="contained"
                        onClick={() => handleCta()}
                        autoFocus
                    >
                        {buttonText()}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
