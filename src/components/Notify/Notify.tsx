import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { notifySetting } from '../../App';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notify = (props: notifySetting) => {
    const { alertOpen, message, alertType, handleClose } = props;

    return (
        <>
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Notify;
