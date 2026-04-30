"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface LoginImage {
  src: string;
  alt: string;
}

interface LoginImagesProps {
  images?: LoginImage[];
}

const DEFAULT_IMAGES: LoginImage[] = [
  { src: "/home-image-1.webp", alt: "Médica revisando prontuário no hospital" },
  { src: "/home-image-2.webp", alt: "Equipe médica caminhando pelo corredor" },
];

export function LoginImages({ images = DEFAULT_IMAGES }: LoginImagesProps) {
  const plugin = React.useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    [],
  );

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full h-full"
      opts={{ loop: true }}
    >
      <CarouselContent className="h-screen">
        {images.map((image, index) => (
          <CarouselItem key={index} className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover dark:brightness-[0.3] dark:grayscale"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
