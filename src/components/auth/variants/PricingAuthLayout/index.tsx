'use client';
import React from 'react';
import NavbarAuth from 'components/navbar/NavbarAuth';
import Card from 'components/card';
import dynamic from 'next/dynamic';
const LineChart = dynamic(() => import('components/charts/LineAreaChart'), {
  ssr: false,
});
import {
  lineChartOptionsRed,
  lineChartOptionsGreen,
  lineChartOptionsBlue,
} from 'variables/charts';

interface GasPriceData {
  timestamp: string;
  slowprice: string;
  mediumprice: string;
  highprice: string;
}

interface ChartData {
  name: string;
  data: number[];
}

function formatPriceData(data: any) {
  // const chartLabels = data.map((price: any) =>
  //   new Date(price.timestamp).toLocaleTimeString([], {
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   }),
  // );
  // lineChartOptionsRed.xaxis['categories'] = chartLabels;
  // lineChartOptionsGreen.xaxis['categories'] = chartLabels;
  // lineChartOptionsBlue.xaxis['categories'] = chartLabels;
  const formattedData = {
    slowPrices: {
      name: 'Slow Price',
      data: data.map((item: any) => {
        parseFloat(item.slowprice) / 1e9;
      }),
    },
    mediumPrices: {
      name: 'Normal Price',
      data: data.map((item: any) => parseFloat(item.mediumprice) / 1e9),
    },
    highPrices: {
      name: 'High Price',
      data: data.map((item: any) => parseFloat(item.highprice) / 1e9),
    },
  };

  return formattedData;
}

function GasPrice({ gasPrices }: { gasPrices: GasPriceData[] }) {
  const formatChartData = formatPriceData(gasPrices);

  return (
    <div className="relative h-full w-full px-3 font-dm dark:bg-navy-900">
      <div className="w-100% -z-1 absolute left-0 right-0 max-h-[60vh] min-h-[26vh] overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat md:mx-auto" />

      <div className="z-1 relative mb-[200px]">
        <NavbarAuth onOpenSidenav={() => {}} />
        {/* Header content */}
        <div className="mx-auto mt-[96px] flex w-full max-w-screen-sm flex-col items-center justify-center text-center md:px-3">
          <h2 className="text-[28px] font-bold text-white md:text-[24px]">
            Track gas prices on Avalanche C Chain from past 48 hours
          </h2>
        </div>
      </div>

      <div className="mt-18 relative mx-auto mb-20 grid h-fit w-full max-w-[375px] grid-cols-1 gap-3  px-3 md:mb-[160px] xl:mt-16 xl:max-w-full xl:grid-cols-3 2xl:max-w-max">
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px] bg-horizonGreen-200 min-h-[380px] min-w-[280px]">
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Slow Price
          </h5>
          {gasPrices && (
            <LineChart
              chartData={formatChartData.slowPrices}
              chartOptions={lineChartOptionsGreen}
            />
          )}
        </Card>

        {/* Normal Price Chart */}
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px] bg-horizonBlue-500 min-h-[380px] min-w-[280px]">
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Normal Price
          </h5>
          {gasPrices && (
            <LineChart
              chartData={formatChartData.mediumPrices}
              chartOptions={lineChartOptionsBlue}
            />
          )}
        </Card>

        {/* Fast Price Chart */}
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px] bg-horizonRed-200 min-h-[380px] min-w-[280px]">
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Fast Price
          </h5>
          {gasPrices && (
            <LineChart
              chartData={formatChartData.highPrices}
              chartOptions={lineChartOptionsRed}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default GasPrice;
