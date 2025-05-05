import { useAppContext } from "@/context/AppContext";
import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
const RunningCard = () => {
  const [carouselApi, setCarouselApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  const getRandomImagePath = (type) => {
    const districts = [
      "Thalang District",
      "Kathu District",
      "Mueang Phuket District",
    ];

    if (districts.includes(type)) {
      const randomIndex = Math.floor(Math.random() * 3) + 1;
      return `/runningEvents/${type}/${type}${randomIndex}_result.webp`;
    }

    return "/runningEvents/Kathu District/Kathu District1_result.webp";
  };



  const { runningEvents } = useAppContext();
  const imagePaths = useMemo(() => {
    return runningEvents.map((event) => ({
      ...event,
      imagePath: getRandomImagePath(event.district),
    }));
  }, [runningEvents]);
  return (
    <section className="py-2">
      <div className="">
        <div className="flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div></div>
          <div className=" flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
          className="relative left-[-1rem]"
        >
          <CarouselContent className="-mr-4 ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {imagePaths.map((event, index) => (
                <CarouselItem key={index} className="pl-4 md:max-w-[452px]">
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={event.imagePath}
                            alt={event.runningEventName}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className=" flex justify-end mt-2 text-xs text-muted-foreground">
                      confidence: {event.confidence}%
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-lg">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        {index + 1}
                      </div>
                      <div>{event.runningEventName}</div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-md text-muted-foreground">
                      <div>{event.district}</div>
                    </div>

                    <div className="mt-2 flex text-md text-muted-foreground">
                      <div>{event.organization}</div>
                    </div>

                    <div className="mt-2 flex text-md text-muted-foreground">
                      <div>{event.level}</div>
                      <div className="ml-2">{event.typeofEvent}</div>
                    </div>
                  </div>
                </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RunningCard;
