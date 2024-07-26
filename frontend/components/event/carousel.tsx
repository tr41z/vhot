import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Media {
  url: string;
  type: string;
}

interface CarouselComponentProps {
  media: Media[];
}

export function CarouselComponent({ media }: CarouselComponentProps) {
  return (
    <Carousel className="w-full max-w-[220px] md:max-w-md mt-4">
      <CarouselContent>
        {media.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-3">
                  {item.type.startsWith("image") ? (
                    <img
                      src={item.url}
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-4xl font-semibold">
                      Unsupported Media
                    </span>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}