// 'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';

export default function AccountList() {
  const [accounts, setAccounts] = useState([])

  const getAccounts = async () => {
    try {
      // Make the GET request using Axios
      const response = await axios.get('http://127.0.0.1:3001/accounts');

      // Handle the response data as needed
      console.log('Response:', response.data);
      setAccounts(response.data)
    } catch (error: any) {
      // Handle any errors that occurred during the request
      console.error('Error:', error.message);
    }
  }

  const renderAccountItem = (account: any) => {
    return (
      <div className="flex items-center gap-4 my-5">
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            {account.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {account.subtype}
          </p>
        </div>
        <div className="ml-auto font-medium">
          ${account.current}
        </div>
      </div>
    )
  }

  useEffect(() => {
    getAccounts()
  }, [])

  return (
      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent className="">
          {accounts.map((acc) => {
            return (
              renderAccountItem(acc)
            )
          })}
        </CardContent>
      </Card>
  );
}