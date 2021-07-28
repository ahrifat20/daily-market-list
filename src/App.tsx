import { Color } from '@material-ui/lab/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { createContext, useState } from 'react';
import Home from './components/Home/Home';
import Notify from './components/Notify/Notify';
import './responsive.css';

export interface notifySetting {
    alertOpen: boolean;
    message: string;
    alertType?: Color;
    handleClose?: () => void;
}

interface Icontext {
    setAlertSyestem: React.Dispatch<React.SetStateAction<notifySetting>>;
}

export const UserContext = createContext<Icontext>({} as Icontext);

function App() {
    const [alertSystem, setAlertSyestem] = useState<notifySetting>({
        alertOpen: false,
        message: 'N/A',
        alertType: 'success'
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlertSyestem({ ...alertSystem, alertOpen: false });
    };

    return (
        <>
            <UserContext.Provider value={{ setAlertSyestem }}>
                <Home />
                <Notify
                    alertOpen={alertSystem.alertOpen}
                    message={alertSystem.message}
                    alertType={alertSystem.alertType}
                    handleClose={handleClose}
                />
            </UserContext.Provider>
        </>
    );
}

export default App;
