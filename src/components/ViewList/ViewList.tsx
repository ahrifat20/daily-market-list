import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { ImarketListType } from '../Home/Home';
import './ViewList.css';

interface Iprops {
    getMarketList: ImarketListType[];
    removeList: (id: number | undefined) => void;
    setGetMarketList: React.Dispatch<React.SetStateAction<ImarketListType[]>>;
}

const ViewList = ({ getMarketList, removeList, setGetMarketList }: Iprops) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { setAlertSyestem } = useContext(UserContext);

    const totalMarket = getMarketList.reduce((acc, list) => acc + list.total, 0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [completeIdNum, setCompleteIdNum] = useState<number | undefined>(undefined);
    const [perUnits, setPerUnits] = useState<number>(0);

    const completeId = (id: number | undefined): void => {
        setCompleteIdNum(id);
        setOpenDialog(true);
    };

    const handleClose = () => {
        const newLists = getMarketList.map((list) => {
            if (list.id === completeIdNum) {
                list.type = true;
                list.perAmountTk = perUnits;
                list.total = list.amount * perUnits;
            }
            return list;
        });

        setGetMarketList(newLists);
        localStorage.setItem('marketLists', JSON.stringify(newLists));
        setOpenDialog(false);
        setAlertSyestem({
            alertOpen: true,
            message: 'List item is Complete Successfully',
            alertType: 'success'
        });
    };

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" className="text-center">
                    {'Plese fill up Input per kg/li tk'}
                </DialogTitle>
                <DialogContent>
                    <input
                        type="number"
                        name="perUnits"
                        className="form-control"
                        placeholder="per kg/li tk"
                        // value={list.amount}
                        onChange={(e) => setPerUnits(parseInt(e.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <TableContainer component={Paper} className="mt-3 p-2">
                <Table aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                <span className="table_heading">Daily Market List</span>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>
                                <span className="row_heading">Item Name</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="row_heading">Amount</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="row_heading">Unit</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="row_heading">Per Unit Tk</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="row_heading">Sum</span>
                            </TableCell>
                            <TableCell align="center">
                                <span className="row_heading noPrint">Action</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getMarketList &&
                            getMarketList.map((list) => (
                                <TableRow key={list.id}>
                                    <TableCell
                                        className={
                                            !list.type ? 'text-success' : 'text-danger line-through'
                                        }
                                    >
                                        {list.itemName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {list.amount ? list.amount : 0}
                                    </TableCell>
                                    <TableCell align="center">
                                        {list.units ? list.units : 0}
                                    </TableCell>
                                    <TableCell align="center">
                                        {list.perAmountTk ? list.perAmountTk : 0}
                                    </TableCell>
                                    <TableCell align="center">
                                        {list.total ? list.total : 0}
                                    </TableCell>
                                    <TableCell align="center">
                                        <button
                                            type="button"
                                            className={
                                                !list.type
                                                    ? 'btn check btn-success mr-2 actionButton noPrint'
                                                    : 'btn check btn-success mr-2 disabled actionButton noPrint'
                                            }
                                            onClick={() => completeId(list.id)}
                                        >
                                            <CheckIcon />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn check noPrint btn-danger actionButton"
                                            onClick={() => removeList(list.id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        <TableRow>
                            <TableCell style={{ border: 'none' }} colSpan={3} />
                            <TableCell style={{ border: 'none' }} align="center">
                                <span className="row_heading">Total</span>
                            </TableCell>
                            <TableCell style={{ border: 'none' }} align="center">
                                {totalMarket}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ViewList;
