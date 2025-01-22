// 'use client';
import { Area, AreaChart, CartesianGrid, Tooltip, YAxis, XAxis, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import useAccounts from '@/hooks/getAccounts';

export default function AccountSummary() {
    const { accounts: data } = useAccounts();

    const areaChart = () => {
        return (
            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Bar
                        dataKey="total"
                        fill="currentColor"
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                    />
                </BarChart>
            </ResponsiveContainer>

        )
    }

    const transactionItem = (trans: any) => {
        return (
            <div className="flex items-center" key={trans.id}>
                <Avatar className="h-9 w-9">
                    <AvatarFallback>BI</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{trans.name}</p>
                    <p className="text-sm text-muted-foreground">
                        AMEX
                    </p>
                </div>
                <div className="ml-auto font-medium">{trans.amount}</div>
            </div>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>
                    Monthly expense budget
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col justify-center' >
                <div>
                    {areaChart()}
                </div>
                <div>
                    <ScrollArea className="rounded-md h-[400px]">
                        {data.map((trans) => {
                            return (
                                transactionItem(trans)
                            )
                        })}
                    </ScrollArea>
                </div>
            </CardContent>
        </Card>
    );
}