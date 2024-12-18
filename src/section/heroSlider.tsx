"use client";

import Image from "next/image";
import * as React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Card } from "../components/ui/card";

const Hero = () => {
  return (
    <div className="m-10 p-5">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/images/keshi.png"
              alt="Banner1"
              width={2000}
              height={500}
              className="rounded-md"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/yoasobi.png"
              alt="Banner2"
              width={2000}
              height={1000}
              className="rounded-md"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/conct2.jpg"
              alt="Banner3"
              width={2000}
              height={1000}
              className="rounded-md"
            />
          </CarouselItem>
          <CarouselItem>
            <Image
              src="/images/swara.png"
              alt="Banner3"
              width={900}
              height={1000}
              className="rounded-md"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hero;
