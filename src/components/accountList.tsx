// 'use client';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TableDemo } from './tableDemo';

export default function AccountList() {

  return (
      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent className="">
          <TableDemo/>
        </CardContent>
      </Card>
  );
}