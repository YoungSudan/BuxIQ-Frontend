'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const useBalances = () => {
    const [balances, setBalances] = useState({
        cash: 0,
        debt: 0,
        loans: 0,
        investments: 0,
    });

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3001/api/v1/me/balances', {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    }
                });

                const data = response.data
                setBalances({
                    cash: data.cash,
                    debt: data.debt,
                    loans: data.loans,
                    investments: data.investments,
                });
            } catch (error) {
                console.log(error)
            } finally {
            };
        }

        fetchBalances();
    }, []);

    return { balances };
};

export default useBalances;
