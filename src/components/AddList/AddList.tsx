import { Grid, Paper } from '@material-ui/core';
import React from 'react';
import { Istate } from '../Home/Home';
import './AddList.css';

interface IAddList {
    list: Istate;
    getInputValue: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAdd: () => void;
}

const AddList = ({ handleAdd, getInputValue, list }: IAddList) => {
    return (
        <>
            <Paper className={`addList px-3 py-3 mt-5 noPrint`}>
                <h4>Add Market List</h4>
                <form className="mt-3">
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12} md={5}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Item Name"
                                name="itemName"
                                value={list.itemName}
                                onChange={getInputValue}
                            />
                        </Grid>
                        <Grid item sm={3} xs={6} md={2}>
                            <select
                                className="form-select"
                                name="units"
                                aria-label="Default select example"
                                value={list.units}
                                onChange={getInputValue}
                            >
                                <option>units</option>
                                <option defaultValue="1">kg</option>
                                <option defaultValue="2">li</option>
                                <option defaultValue="3">ton</option>
                            </select>
                        </Grid>
                        <Grid item sm={3} xs={6} md={2}>
                            <input
                                type="number"
                                name="amount"
                                className="form-control"
                                placeholder="Amount"
                                value={list.amount ? list.amount : ''}
                                onChange={getInputValue}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12} md={3}>
                            <button
                                type="button"
                                onClick={handleAdd}
                                className="btn btn-primary btn-big"
                            >
                                Add Item
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );
};

export default AddList;
