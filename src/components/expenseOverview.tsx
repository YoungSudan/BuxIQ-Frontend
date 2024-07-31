"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card"
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "./ui/button"


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

      const progressPercentage = Math.max((65.00 / 100.00) * 100, 0);
    return (
      <Card className="p-4">
        <p>Monthly Budget Tracker</p>
        <div className="mt-4">
          <p>Initial Budget: ${100.00}</p>
          <p>Amount Spent: ${65.00}</p>
          <p>Remaining Budget: ${35.00}</p>
        </div>
        <Progress value={progressPercentage} className="mt-4" />
        <Button
          className="mt-4"
          onClick={() => alert(`You have $${35.00} left this month.`)}
        >
          Check Remaining Budget
        </Button>
      </Card>
    )
}
