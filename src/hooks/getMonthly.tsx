'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const useMonthly = () => {
    const [monthly, setMonthly] = useState([]);

    useEffect(() => {
        const fetchMonthly = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3001/api/v1/me/monthly', {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    }
                });

                const data = response.data
                setMonthly(data);
            } catch (error) {
                console.log(error)
            } finally {
            };
        }

        fetchMonthly();
    }, []);

    return { monthly };
};

export default useMonthly;