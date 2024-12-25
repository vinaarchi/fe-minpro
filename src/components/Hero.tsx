"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const Hero = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const images = [
    "/images/hero/keshi.png",
    "/images/hero/swara.png",
    "/images/hero/yoasobi.png",
  ];

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full p-5"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="p-0">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 " />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2"/>
      </Carousel>
    </div>
  );
};

export default Hero;
