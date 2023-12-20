'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const GasPrice = dynamic(
  () => import('components/auth/variants/PricingAuthLayout'),
  {
    ssr: false,
  },
);

async function getData() {
  const res = await fetch('https://avaxgastracker.replit.app/api/gas-prices');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function GasTrackerPage() {
  const [data, setData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    getData().then(setData).catch(console.error);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>; // Or any other placeholder
  }

  return data ? <GasPrice gasPrices={data} /> : <div>Loading data...</div>;
}
