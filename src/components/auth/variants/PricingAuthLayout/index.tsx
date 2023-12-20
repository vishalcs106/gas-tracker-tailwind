'use client';
import NavbarAuth from 'components/navbar/NavbarAuth';
import React, { useState } from 'react';
import zoho from '/public/svg/zoho-logo.svg';
import deloite from '/public/svg/deloitte-logo.svg';
import georgia from '/public/svg/georgia-logo.svg';
import google from '/public/svg/google-logo.svg';
import microsoft from '/public/svg/microsoft-logo.svg';
import msn from '/public/svg/msn-logo.svg';
import Footer from 'components/footer/Footer';
import Card from 'components/card';
import Sidebar from 'components/sidebar';
import routes from 'routes';
import Image from 'next/image';

function Pricing() {
  const [open, setOpen] = React.useState(true);
  const [activeButton, setActiveButton] = useState('monthly');
  return (
    // pricing page
    <div className="relative h-full w-full px-3 font-dm dark:bg-navy-900">
      <div className="w-100% -z-1 absolute left-0 right-0 max-h-[60vh] min-h-[26vh] overflow-hidden bg-gradient-to-br from-brand-400 to-brand-600 bg-cover bg-no-repeat md:mx-auto" />

      <div className="z-1 relative mb-[200px]">
        <NavbarAuth onOpenSidenav={() => setOpen(!open)} />
        {/* Header content */}
        <div className="mx-auto mt-[96px] flex w-full max-w-screen-sm flex-col items-center justify-center text-center md:px-3">
          <h2 className="text-[28px] font-bold text-white md:text-[24px]">
            Track gas prices on Avalanche C Chain from past 48 hours
          </h2>
        </div>
      </div>

      {/* Pricing section */}
      <div className="mt-18 relative mx-auto mb-20 grid h-fit w-full max-w-[375px] grid-cols-1 gap-3  px-3 md:mb-[160px] xl:mt-16 xl:max-w-full xl:grid-cols-3 2xl:max-w-max">
        {/* 1th card */}
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px] bg-brand-200 min-h-[380px] min-w-[280px]">
          {/* Card header */}
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Slow Price
          </h5>
        </Card>
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px] bg-brand-200 min-h-[380px] min-w-[280px]">
          {/* Card header */}
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Slow Price
          </h5>
        </Card>
        <Card extra="w-full h-full rounded-[20px] pb-6 pt-8 px-[20px] bg-brand-200 min-h-[380px] min-w-[280px]">
          {/* Card header */}
          <h5 className="font-dm text-3xl font-bold text-navy-700 dark:text-white">
            Slow Price
          </h5>
        </Card>
      </div>
    </div>
  );
}

export default Pricing;
