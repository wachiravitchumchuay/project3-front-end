import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarouselPage = () => {
  const { sharedProp, setSharedProp } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-yellow-200 p-4">
        {/* <h1>CarouselPage Page</h1>
        <p>{sharedProp}</p>
        <Button onClick={() => setSharedProp("Updated from About Page!")}>
          Update Context
        </Button> */}
        <div className="flex">
          <div className="w-1/2">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm"
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={`src/assets/restaurant${index + 1}.jpg`}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-semibold">Description </h2>
            <p>This is the description for image.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarouselPage;
