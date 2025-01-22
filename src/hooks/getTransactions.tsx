'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/me/transactions', {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    }
                });
                const data = response.data
                setTransactions(data);
            } catch (error) {
                console.log(error)
            } finally {
            };
        }

        fetchTransactions();
    }, []);

    return { transactions };
};

export default useTransactions;