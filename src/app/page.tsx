"use client"
import { CalendarDateRangePicker } from "@/components/date-range-picker"

import { Overview } from "@/components/overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"

import AccountList from "@/components/accountList"
import {ExpenseOverview}  from "@/components/expenseOverview"
import { Badge } from "@/components/ui/badge"
import axios from 'axios'
import { useCallback, useEffect, useState } from "react"
import AccountSummary from "@/components/accountsSummary"
import { Button } from "@/components/ui/button"
import PlaidLink from "@/components/plaidLink"
import useBalances from "@/hooks/getBalances"
import useMonthly from "@/hooks/getMonthly"
import { ChartDemo } from "@/components/chartDemo"


// import TeamSwitcher from "@/components/team-switcher"
// import { MainNav } from "@/components/main-nav"
// import { Search } from "@/components/search"

export default function DashboardPage() {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])

  const [cash, setCash] = useState(0)
  const [debt, setDebt] = useState(0)
  const [loans, setloans] = useState(0)
  const [inventments, setInvestments] = useState(0)

  const { balances } = useBalances();


  async function getAccounts() {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/v1/accounts');
      setAccounts(response.data.accounts)
    } catch (error: any) {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
    }
  }

  async function getTransactions() {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/v1/transactions');
      setTransactions(response.data.transactions)
    } catch (error: any) {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
    }
  }

  async function getCategories() {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/v1/categories');
      setCategories(response.data.categories)
    } catch (error: any) {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
    }
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            {<PlaidLink/> && localStorage.getItem("authToken") !== null}
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
                      Cash
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balances.cash}</div>
                    <Badge className="bg-[#65a30d]">
                      +20.1%
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Credit Debt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balances.debt}</div>
                    <Badge className="bg-[#65a30d]">
                      +20.1%
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Loan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balances.loans}</div>
                    <Badge className="bg-[#65a30d]">
                      +20.1%
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${balances.investments}</div>
                    <Badge className="bg-[#65a30d]">
                      +20.1%
                    </Badge>
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
                      50 latest transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="rounded-md h-[400px]">
                      <RecentTransactions />
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
                  <CardContent className="grid grid-cols-3 gap-5 max-h-500">
                    <AccountList/>
                    <ChartDemo/>
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
