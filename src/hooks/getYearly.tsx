'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const useYearly = () => {
    const [yearly, setYearly] = useState([]);

    useEffect(() => {
        const fetchMonthly = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3001/api/v1/me/yearly_spending?year=2024', {
                    headers: {
                        Authorization: localStorage.getItem("authToken"),
                    }
                });

                const data = response.data
                setYearly(data);
            } catch (error) {
                console.log(error)
            } finally {
            };
        }

        fetchMonthly();
    }, []);

    return { yearly };
};

export default useYearly;