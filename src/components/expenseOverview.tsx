"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"
import axios from "axios"


export function ExpenseOverview() {
  const [categories, setCategories] = useState([])

    const getCategories= async () => {
        try {
          // Make the GET request using Axios
          const response = await axios.get('http://127.0.0.1:3001/accounts');
    
          // Handle the response data as needed
          console.log('Response:', response.data);
          setCategories(response.data.accounts)
        } catch (error: any) {
          // Handle any errors that occurred during the request
          console.error('Error:', error.message);
        }
      }
    
      useEffect(() => {
        getCategories()
      }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget Expense</CardTitle>
                <CardDescription>
                    Categorey budgets
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Progress value={37} className="w-[60%]" />
                <Progress value={85} className="w-[60%]" />
                <Progress value={67} className="w-[60%]" />
                <Progress value={74} className="w-[60%]" />
                <Progress value={21} className="w-[60%]" />
            </CardContent>
        </Card>
    )
}
