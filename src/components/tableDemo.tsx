import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from "axios";
import { useEffect, useState } from "react";
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]


  
  export function TableDemo() {
    const [accounts, setAccounts] = useState([])

    const getAccounts = async () => {
      try {
        // Make the GET request using Axios
        const response = await axios.get('http://127.0.0.1:3001/api/v1/accounts',{
          headers: {
            Authorization: localStorage.getItem("authToken"),
          }
        });
        console.log("DATA: ",response.data)
        setAccounts(response.data)
      } catch (error: any) {
        // Handle any errors that occurred during the request
        console.error('Error:', error.message);
      }
    }
  
    useEffect(() => {
      getAccounts()
    }, [])

    return (
      <ScrollArea className="rounded-md h-[500px]">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {accounts.map((account) => (
                <TableRow key={account['id']}>
                  <TableCell className="font-medium">{account['name']}</TableCell>
                  <TableCell>{account['subtype']}</TableCell>
                  <TableCell>{account['current']}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$0.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    )
  }
  