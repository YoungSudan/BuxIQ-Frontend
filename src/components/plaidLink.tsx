'use client'
//http://127.0.0.1:3001/plaid/create_link_token
import { useEffect, useState, useCallback } from 'react';
import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnSuccessMetadata,
  } from 'react-plaid-link';
import axios from 'axios';
import { Button } from './ui/button';

  
const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      // Prevent multiple calls if already loading or if we already have a token
      if (isLoading || linkToken) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:3001/plaid/create_link_token', {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        });
        
        const { link_token } = response.data;
        setLinkToken(link_token);
      } catch (error: any) {
        console.error('Error:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getLinkToken();
  }, [linkToken, isLoading]); // Add dependencies to control re-renders


  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token, metadata) => {
      try {
        const response = await axios.post('http://127.0.0.1:3001/plaid/exchange_public_token', {
            public_token: public_token
        }, {
            headers: {
                Authorization: localStorage.getItem("authToken"),
            }
        });
        setLinkToken(response.data)
      } catch (error: any) {
        console.error('Error:', error.message);
      }
    },
    [],
  );


  const config: PlaidLinkOptions = {
    onSuccess: onSuccess,
    onExit: (err, metadata) => {},
    onEvent: (eventName, metadata) => {},
    token: linkToken,
  };
  const { open, exit, ready } = usePlaidLink(config);

  return (
    <div>
      <Button onClick={() => open()}>
        Connect Bank
      </Button>
    </div>
  );
};

export default PlaidLink;