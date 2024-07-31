// 'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell } from 'recharts';

import axios from 'axios';

export default function ExpenseTracker() {
    const [accounts, setAccounts] = useState([])

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>
                    Monthly expense budget
                </CardDescription>
            </CardHeader>
            <CardContent >
                <PieChart className='flex justify-center' width={300} height={400}>
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </CardContent>
        </Card>
    );
}