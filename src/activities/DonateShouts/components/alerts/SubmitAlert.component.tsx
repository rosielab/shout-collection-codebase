import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/**
 * Alert for audio submission. Has multiple states that can be passed into the props
 * to display different alerts specific to recording audio
 */

export enum ALERT_MODE {
    SUCCESS,
    FAILED,
    LOADING,
    INFORM,
}

interface SubmitAlertProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    handleAgreeSubmit: (setDisableSubmit: Function) => void;
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

    const [disableSubmit, setDisableSubmit] = useState(false);

    const content = () => {
        switch (alertMode) {
            case ALERT_MODE.SUCCESS:
                return '';
            case ALERT_MODE.FAILED:
                return 'Something went wrong. Give it another try. Click off this box to close.';
            case ALERT_MODE.INFORM:
                return 'You will not be able to go back to the previous questions if you click yes. We have to process your audio in order to retrieve your results.';
            default:
                return '';
        }
    };

    const title = () => {
        switch (alertMode) {
            case ALERT_MODE.SUCCESS:
                return 'Audio has been successfully submitted!';
            case ALERT_MODE.FAILED:
                return 'Audio has been failed to submit!';
            case ALERT_MODE.INFORM:
                return 'Are you sure you want to submit this audio?';
            case ALERT_MODE.LOADING:
                return 'Hold on, we are submitting your audio.';
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
                return handleAgreeSubmit(setDisableSubmit);
            case ALERT_MODE.INFORM:
                setDisableSubmit(true);
                return handleAgreeSubmit(setDisableSubmit);
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
                        disabled={disableSubmit}
                    >
                        {buttonText()}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};
