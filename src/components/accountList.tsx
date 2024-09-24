// 'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
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