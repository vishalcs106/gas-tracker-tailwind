'use client';
import React, { useState } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { track } from '@vercel/analytics';
import NavbarAuth from 'components/navbar/NavbarAuth';
import SolidSubtleAlert from 'utils/SolidSubtleAlert';
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
import Footer from 'components/footer/Footer';

interface GasPriceData {
  timestamp: string;
  slowprice: string;
  mediumprice: string;
  highprice: string;
  latest: string;
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
      latest: parseFloat(data[data.length - 1].slowprice) / 1e9 + '',
    },
    mediumPrices: {
      name: 'Normal Price',
      data: data.map((item: any) => parseFloat(item.mediumprice) / 1e9),
      latest: parseFloat(data[data.length - 1].mediumprice) / 1e9 + '',
    },
    highPrices: {
      name: 'High Price',
      data: data.map((item: any) => parseFloat(item.highprice) / 1e9),
      latest: parseFloat(data[data.length - 1].highprice) / 1e9 + '',
    },
  };

  return formattedData;
}

function GasPrice({ gasPrices }: { gasPrices: GasPriceData[] }) {
  const formatChartData = formatPriceData(gasPrices);
  const [showToast, setShowToast] = useState(false);
  const handleCopy = () => {
    track('Copy');
    navigator.clipboard
      .writeText('0x7A060178E375e3FA7F75D4c041E3F3f0b642B4c9')
      .then(() => {
        console.log('Text copied to clipboard');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 1000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };
  return (
    <div className=" flex min-h-screen w-full flex-col font-dm dark:bg-navy-900">
      <div className="w-100% -z-1 absolute left-0 right-0 max-h-[80vh] min-h-[40vh] flex-grow overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat md:mx-auto" />

      <div className="z-1 relative mb-[120px] px-2">
        <NavbarAuth onOpenSidenav={() => {}} />
        {/* Header content */}
        <div className="mx-auto mt-[96px] flex w-full max-w-screen-sm flex-col items-center justify-center text-center md:px-3">
          <h2 className="text-[28px] font-bold text-white md:text-[24px]">
            Track gas prices on Avalanche C Chain from past 48 hours
          </h2>
        </div>
      </div>

      <div className="xl:mt-18 relative mx-auto mb-3 grid h-fit w-full max-w-[375px] grid-cols-1 gap-3 px-3  xl:max-w-full xl:grid-cols-3 2xl:max-w-max">
        <Card extra="w-full h-full flex flex-col justify-end rounded-[20px]   min-h-[380px] min-w-[280px] max-h-[420px]">
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
            <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Slow Price
            </h5>
            <h5 className="font-dm text-xl font-bold text-navy-700 dark:text-white">
              Current: {formatChartData.slowPrices.latest} gwei
            </h5>
            <div className="flex-grow"></div> {/* Spacer */}
            <div className="h-full">
              {gasPrices && (
                <LineChart
                  chartData={formatChartData.slowPrices}
                  chartOptions={lineChartOptionsGreen}
                />
              )}
            </div>
          </div>
        </Card>

        <Card extra="w-full h-full flex flex-col justify-end rounded-[20px] min-h-[380px] min-w-[280px] max-h-[420px]">
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
            <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Normal Price
            </h5>
            <h5 className="font-dm text-xl font-bold text-navy-700 dark:text-white">
              Current: {formatChartData.mediumPrices.latest} gwei
            </h5>
            <div className="flex-grow"></div> {/* Spacer */}
            <div className="h-full">
              {gasPrices && (
                <LineChart
                  chartData={formatChartData.mediumPrices}
                  chartOptions={lineChartOptionsBlue}
                />
              )}
            </div>
          </div>
        </Card>

        <Card extra="w-full h-full flex flex-col justify-end rounded-[20px]  min-h-[380px] min-w-[280px] max-h-[420px]">
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
            <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
              Fast Price
            </h5>
            <h5 className="font-dm text-xl font-bold text-navy-700 dark:text-white">
              Current: {formatChartData.highPrices.latest} gwei
            </h5>
            <div className="flex-grow"></div> {/* Spacer */}
            <div className="h-full">
              {gasPrices && (
                <LineChart
                  chartData={formatChartData.highPrices}
                  chartOptions={lineChartOptionsRed}
                />
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="my-20 flex h-[80px] w-full flex-row items-center justify-center px-10">
        <Card
          extra="flex flex-col justify-center rounded-[20px]  min-h-[180px] min-w-[280px] max-h-[420px] items-center"
          style={{ backgroundColor: '#fca5a5' }}
        >
          <p className="font-dm text-xl font-bold text-navy-700 dark:text-white">
            Maintained by:
          </p>
          <h5 className="mb-6 font-dm text-xl font-bold text-navy-700 dark:text-white">
            <a href="https://twitter.com/wishaleth" target="_blank">
              @wishaleth
            </a>
          </h5>
          <p className="font-dm text-xl font-bold text-navy-700 dark:text-white">
            Tip me:
          </p>
          <h5
            className="cursor-pointer font-dm text-xl font-bold text-navy-700 dark:text-white"
            onClick={handleCopy}
          >
            0x7A060...B4c9 📋
          </h5>
        </Card>
      </div>

      <div className="flex flex-grow flex-col"></div>

      {showToast && (
        <div className="sticky bottom-10 px-10">
          <SolidSubtleAlert
            title="Copied to clipboard"
            justify="justify-center"
            icon={<BsFillCheckCircleFill />}
            iconColor="text-white dark:!text-navy-900"
            bg="bg-green-500 dark:!bg-green-300"
            mb="mb-6"
            closeBg="hover:bg-white/20 text-white dark:!text-navy-900"
            solid="solid"
          />
        </div>
      )}

      <div className="sticky bottom-0 h-[60px] w-full bg-brand-700">
        <Footer />
      </div>
    </div>
  );
}

export default GasPrice;
