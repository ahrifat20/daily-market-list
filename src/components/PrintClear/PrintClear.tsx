import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { ImarketListType } from '../Home/Home';

interface Iprops {
    setGetMarketList: React.Dispatch<React.SetStateAction<ImarketListType[]>>;
}
const PrintClear = ({ setGetMarketList }: Iprops) => {
    const { setAlertSyestem } = useContext(UserContext);

    const handleClear = (): void => {
        setGetMarketList([]);
        localStorage.clear();
        setAlertSyestem({
            alertOpen: true,
            message: 'Market Lists Clear Successfully',
            alertType: 'success'
        });
    };

    const listPrint = (): void => {
        print();
    };
    return (
        <div className="noPrint">
            <Grid container spacing={2} className="mt-2">
                <Grid item xs={6}>
                    <button type="button" onClick={handleClear} className="btn btn-danger btn-big">
                        Clear List
                    </button>
                </Grid>
                <Grid item xs={6}>
                    <button type="button" onClick={listPrint} className="btn btn-success btn-big">
                        Print List
                    </button>
                </Grid>
            </Grid>
        </div>
    );
};

export default PrintClear;
