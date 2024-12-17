"use client";

import Image from "next/image";
import * as React from "react";
import Slider from "react-slick";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const Hero = () => {
  return (
    <div className="m-10 p-5">
      <Carousel>
        <Card>
          <CardContent className="flex aspect-auto items-center justify-center p-44">
            <Image
              src="/images/lany.jpg"
              alt="Banner1"
              layout="fill"
              objectFit="cover"
            />
          </CardContent>
        </Card>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hero;
