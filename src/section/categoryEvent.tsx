"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const CategoryEvent = () => {
  return (
    <div>
      <div className="bg-customLightBlue p-10">
        <h1 className="text-4xl font-ibrand text-white">Kategori Event</h1>
        <div className="justify-center grid grid-cols-2 md:grid-cols-6 ">
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/art.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Art
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/culinary.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Culinary
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/edu.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Education
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/fashion.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              fashion
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/music.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Sport
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/sport.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Tech
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/tech.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Tech
            </p>
          </div>
          <div className="relative w-48 pt-5">
            <Image
              src="/images/category/travel.jpg"
              alt="Top Events 1"
              width={500}
              height={250}
              objectFit="cover"
              className="rounded-lg"
            />
            <p className="text-center font-ibrand p-2 text-2xl text-white">
              Travel
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-8">
        <Link href="/event-detail">
          <p className="text-center hover:text-customOrange text-4xl font-ibrand">
            Jelajahi event lainnya
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CategoryEvent;
