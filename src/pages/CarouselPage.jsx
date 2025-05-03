// eslint-disable-next-line
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
//TODO: change to running picture
const CarouselPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-white bg-green-1 px-14 py-2">
        <div className="flex">
          <div className="w-3/5">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="">
                    <div>
                      <Card className="py-2">
                        <CardContent className="px-2 h-[500px]">
                          <img
                            src={`/carousel/restaurant${index + 1}_result.webp`}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-black" />
              <CarouselNext className="text-black" />
            </Carousel>
          </div>
          <div className="w-2/5 p-28">
            <div className="font-head text-6xl">Explore </div>
            <div className="mt-6">
              The best of Phuket with personalized restaurant picks, matching
              travel spots, and running events — designed around your choices
              and lifestyle.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselPage;
