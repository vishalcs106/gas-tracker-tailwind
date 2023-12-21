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
  const chartLabels = data.map((price: any) =>
    new Date(price.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  );
  let slowHighest = 0;
  let slowLowest = Infinity;
  let normalHighest = 0;
  let normalLowest = Infinity;
  let fastHighest = 0;
  let fastLowest = Infinity;
  data.map((price: any) => {
    if (price.slowprice / 1e9 < slowLowest) slowLowest = price.slowprice / 1e9;
    if (price.slowprice / 1e9 > slowHighest)
      slowHighest = price.slowprice / 1e9;
    if (price.mediumprice / 1e9 < normalLowest)
      normalLowest = price.mediumprice / 1e9;
    if (price.mediumprice / 1e9 > normalHighest)
      normalHighest = price.mediumprice / 1e9;
    if (price.highprice / 1e9 < fastLowest) fastLowest = price.highprice / 1e9;
    if (price.highprice / 1e9 > fastHighest)
      fastHighest = price.highprice / 1e9;
  });
  lineChartOptionsRed.xaxis['categories'] = chartLabels;
  lineChartOptionsGreen.xaxis['categories'] = chartLabels;
  lineChartOptionsBlue.xaxis['categories'] = chartLabels;
  lineChartOptionsGreen.annotations.yaxis[1]['y'] = slowLowest;
  lineChartOptionsGreen.annotations.yaxis[1]['label']['text'] = slowLowest + '';
  lineChartOptionsGreen.annotations.yaxis[0]['y'] = slowHighest;
  lineChartOptionsGreen.annotations.yaxis[0]['label']['text'] =
    slowHighest + '';
  lineChartOptionsBlue.annotations.yaxis[1]['y'] = normalLowest;
  lineChartOptionsBlue.annotations.yaxis[1]['label']['text'] =
    normalLowest + '';
  lineChartOptionsBlue.annotations.yaxis[0]['y'] = normalHighest;
  lineChartOptionsBlue.annotations.yaxis[0]['label']['text'] =
    normalHighest + '';
  lineChartOptionsRed.annotations.yaxis[1]['y'] = fastLowest;
  lineChartOptionsRed.annotations.yaxis[1]['label']['text'] = fastLowest + '';
  lineChartOptionsRed.annotations.yaxis[0]['y'] = fastHighest;
  lineChartOptionsRed.annotations.yaxis[0]['label']['text'] = fastHighest + '';
  const formattedData = {
    slowPrices: {
      name: 'Slow Price',
      data: data.map((item: any) => parseFloat(item.slowprice) / 1e9),
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
      <div className="w-100% -z-1 absolute left-0 right-0 max-h-[80vh] min-h-[40vh] overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat md:mx-auto" />

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
        <Card extra="w-full h-full flex flex-col justify-end rounded-[20px]   min-h-[380px] min-w-[280px]">
          <div
            className="flex flex-col justify-end"
            style={{
              borderRadius: '20px',
              backgroundColor: '#BDFFE7',
              width: '100%',
              height: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <h5 className="mt-6 font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Slow Price
            </h5>
            <div className="flex-grow"></div> {/* Spacer */}
            {gasPrices && (
              <LineChart
                chartData={formatChartData.slowPrices}
                chartOptions={lineChartOptionsGreen}
              />
            )}
          </div>
        </Card>

        <Card extra="w-full h-full flex flex-col justify-end rounded-[20px] min-h-[380px] min-w-[280px]">
          <div
            className="flex flex-col justify-end"
            style={{
              borderRadius: '20px',
              backgroundColor: '#D6DFFF',
              width: '100%',
              height: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <h5 className="mt-6 font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Normal Price
            </h5>
            <div className="flex-grow"></div> {/* Spacer */}
            {gasPrices && (
              <LineChart
                chartData={formatChartData.mediumPrices}
                chartOptions={lineChartOptionsBlue}
              />
            )}
          </div>
        </Card>

        <Card extra="w-full h-full flex flex-col justify-end rounded-[20px]  min-h-[380px] min-w-[280px]">
          <div
            className="flex flex-col justify-end"
            style={{
              borderRadius: '20px',
              backgroundColor: '#FAD1D1',
              width: '100%',
              height: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
            }}
          >
            <h5 className="mt-6 font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Fast Price
            </h5>
            <div className="flex-grow"></div> {/* Spacer */}
            {gasPrices && (
              <LineChart
                chartData={formatChartData.highPrices}
                chartOptions={lineChartOptionsRed}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GasPrice;
