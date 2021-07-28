import { Container } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import ActionButtons from '../ActionButtons/ActionButtons';
import AddList from '../AddList/AddList';
import PrintClear from '../PrintClear/PrintClear';
import ViewList from '../ViewList/ViewList';
import './Home.css';

export interface ImarketListType {
    id: undefined | number;
    itemName: string | undefined;
    units: string | undefined;
    amount: number;
    type: boolean;
    perAmountTk: number | undefined;
    total: number;
}

export interface Istate {
    itemName: string;
    units: string;
    amount: number;
}

const Home = () => {
    const [getMarketList, setGetMarketList] = useState<ImarketListType[]>([]);
    // console.log(getMarketList[1].amount);
    const [category, setCategory] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<ImarketListType[]>([]);

    useEffect(() => {
        if (localStorage.getItem('marketLists')) {
            let getListStorage = JSON.parse(localStorage.getItem('marketLists') || '[]');
            setGetMarketList(getListStorage);
        }
    }, []);

    const { setAlertSyestem } = useContext(UserContext);

    const [list, setList] = useState<Istate>({
        itemName: '',
        units: '',
        amount: 0
    });

    const getInputValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newList = { ...list };
        if (e.target.name === 'amount') {
            newList.amount = parseInt(e.target.value);
        } else if (e.target.name === 'itemName') {
            newList.itemName = e.target.value;
        } else {
            newList.units = e.target.value;
        }
        setList(newList);
    };

    const handleAdd = (): void => {
        const { itemName, units, amount } = list;

        if (!itemName || !units || !amount) {
            setAlertSyestem({
                alertOpen: true,
                message: 'Please Fill Up All Input Field',
                alertType: 'warning'
            });
        } else if (!units || units === 'units') {
            setAlertSyestem({
                alertOpen: true,
                message: 'Units Field is Empty',
                alertType: 'warning'
            });
        } else if (!amount || (amount && amount < 0)) {
            setAlertSyestem({
                alertOpen: true,
                message: 'Please provide Currect amount',
                alertType: 'warning'
            });
        } else {
            const newListMake = {
                id: getMarketList.length + 1,
                ...list,
                type: false,
                perAmountTk: undefined,
                total: 0
            };
            setGetMarketList([...getMarketList, newListMake]);
            localStorage.setItem('marketLists', JSON.stringify([...getMarketList, newListMake]));
            setAlertSyestem({
                alertOpen: true,
                message: 'New List Add Successfully',
                alertType: 'success'
            });
            setList({
                itemName: '',
                units: '',
                amount: 0
            });
        }
    };

    useEffect(() => {
        if (category === 'all') {
            setCategoryFilter([...getMarketList]);
        }
        if (category === 'active') {
            const activeList = getMarketList.filter((list) => !list.type);
            setCategoryFilter([...activeList]);
        }
        if (category === 'done') {
            const finished = getMarketList.filter((list) => list.type);
            setCategoryFilter([...finished]);
        }
    }, [category, getMarketList]);

    const removeList = (id: number | undefined): void => {
        const newMarketLists = getMarketList.filter((list) => list.id !== id);
        setGetMarketList([...newMarketLists]);
        localStorage.setItem('marketLists', JSON.stringify(newMarketLists));

        setAlertSyestem({
            alertOpen: true,
            message: 'List Remove Successfully',
            alertType: 'success'
        });
    };

    return (
        <section>
            <h1 className="app_name text-center noPrint">Daily Market List App</h1>
            <Container>
                <AddList handleAdd={handleAdd} list={list} getInputValue={getInputValue} />
                {getMarketList.length !== 0 ? (
                    <div>
                        <ActionButtons setCategory={setCategory} />
                        <ViewList
                            getMarketList={categoryFilter}
                            setGetMarketList={setGetMarketList}
                            removeList={removeList}
                        />
                        <PrintClear setGetMarketList={setGetMarketList} />
                    </div>
                ) : (
                    ''
                )}
            </Container>
        </section>
    );
};

export default Home;
