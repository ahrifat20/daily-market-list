import { Grid } from '@material-ui/core';
import React from 'react';

interface iProps {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ActionButtons = ({ setCategory }: iProps) => {
    return (
        <div className="noPrint">
            <Grid container spacing={2} className="mt-2">
                <Grid item xs={6} md={4}>
                    <button
                        type="button"
                        onClick={() => setCategory('all')}
                        className="btn btn-primary btn-big"
                    >
                        All Item
                    </button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <button
                        type="button"
                        onClick={() => setCategory('active')}
                        className="btn btn-warning btn-big"
                    >
                        Pending Item
                    </button>
                </Grid>
                <Grid item xs={12} md={4}>
                    <button
                        type="button"
                        onClick={() => setCategory('done')}
                        className="btn btn-success btn-big"
                    >
                        Finished Item
                    </button>
                </Grid>
            </Grid>
        </div>
    );
};

export default ActionButtons;
