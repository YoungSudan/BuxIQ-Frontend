'use client'

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const axios = require('axios');
import { ScrollArea } from "@/components/ui/scroll-area"

export function RecentSales() {
  const [data, setData] = useState([])

  const getTransactions = async () => {
    const res = await axios.get('http://localhost:3001/transactions')
    console.log(res)

    setData(res.data)
    console.log(data)
  }

  useEffect(() => {
    getTransactions()
  }, [])


  const transactionItem = (trans: any) => {
    return (
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src={trans.personal_finance_category_icon_url} alt="Avatar" />
          <AvatarFallback>BI</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{trans.name}</p>
          <p className="text-sm text-muted-foreground">
            {trans.detailed}
          </p>
        </div>
        <div className="ml-auto font-medium">{trans.amount}</div>
      </div>
    )
  }
  return (
      <div className="space-y-8">
        {data.map((trans) => {
          return (
            transactionItem(trans)
          )
        })}
      </div>
  )
}


