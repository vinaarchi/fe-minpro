"use client";

import Image from "next/image";
import * as React from "react";

const TopEvents = () => {
  return (
    <div>
      <div className="bg-customMediumBlue p-12">
        <div>
          <h1 className="text-white font-ibrand text-5xl pb-5">Top Event !</h1>
          <div className="justify-center grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative w-full h-64">
              <Image
                src="/images/swara3.png"
                alt="Top Events 1"
                width={500}
                height={250}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image
                src="/images/yoasobi2.png"
                alt="Top Events 2"
                width={500}
                height={250}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="relative w-full h-64">
              <Image
                src="/images/keshi2.png"
                alt="Top Events 3"
                width={500}
                height={250}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopEvents;
