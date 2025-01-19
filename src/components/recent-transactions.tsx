'use client'

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useTransactions from "@/hooks/getTransactions";

export function RecentTransactions() {
  const {transactions} = useTransactions()

  const transactionItem = (trans: any) => {
    return (
      <div className="flex items-center" key={trans.id}>
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
        {transactions.map((trans) => {
          return (
            transactionItem(trans)
          )
        })}
      </div>
  )
}


