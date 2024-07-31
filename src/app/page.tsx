"use client"
import { CalendarDateRangePicker } from "@/components/date-range-picker"

import { Overview } from "@/components/overview"
import { RecentSales } from "@/components/recent-sales"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"

import AccountList from "@/components/accountList"
import {ExpenseOverview}  from "@/components/expenseOverview"
import ExpenseTracker from "@/components/expenseTracker"
import { Badge } from "@/components/ui/badge"
import axios from 'axios'
import { useEffect, useState } from "react"
import AccountSummary from "@/components/accountsSummary"

// import TeamSwitcher from "@/components/team-switcher"
// import { MainNav } from "@/components/main-nav"
// import { Search } from "@/components/search"

export default function DashboardPage() {
  const [money, setMoney] = useState(0)
  const [cash, setCash] = useState(0)

  async function getTestAccount() {
    try {
      // Make the GET request using Axios
      const response = await axios.get('http://127.0.0.1:3001/accounts/test');

      // Handle the response data as needed
      console.log('Response:', response.data);
      setMoney(response.data.money)
    } catch (error: any) {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
    }
  }

  async function getTotalCash() {
    const res = await axios.get('http://127.0.0.1:3001/cash')
    console.log(res)

    setCash(Number(res.data))
  }

  useEffect(() => {
    getTestAccount();
    getTotalCash()
  }, []);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              <UserNav />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Cash
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${cash}</div>
                    <Badge className="bg-[#65a30d]">
                      +20.1%
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Debt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Netwoth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      120 transactions made this month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="rounded-md h-[400px]">
                      <RecentSales />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="accounts" className="space-y-4">
              <div className=" grid gap-3 grid-flow-row">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Accounts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-row justify-center justify-evenly">
                    <AccountList/>
                    <ExpenseTracker/>
                    <ExpenseOverview/>  
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="expenses">
              <AccountSummary/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
