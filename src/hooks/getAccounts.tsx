'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const useAccounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/accounts', {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    }
                });
                const data = response.data
                setAccounts(data);
            } catch (error) {
                console.log(error)
            } finally {
            };
        }

        fetchTransactions();
    }, []);

    return { accounts };
};

export default useAccounts;