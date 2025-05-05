import { ArrowLeft, ArrowRight, Flame } from "lucide-react";
import { useEffect, useState,useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppContext } from "../context/AppContext";

const getRandomImagePath = (type) => {
  const districts = [
    "Thalang District",
    "Kathu District",
    "Mueang Phuket District",
  ];

  if (districts.includes(type)) {
    const randomIndex = Math.floor(Math.random() * 3) + 1;
    return `/travelPlaces/${type}/${type}${randomIndex}_result.webp`;
  }

  return "/travelPlaces/Kathu District/Kathu District1_result.webp"; //default
};

const TravelDisplayPage = () => {
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

  const { travelPlaces } = useAppContext();

    const imagePaths = useMemo(() => {
      return travelPlaces.map((event) => ({
        ...event,
        imagePath: getRandomImagePath(event.district),
      }));
    }, [travelPlaces]);
  return (
    <section className="py-16">
      <div className="">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="font-head text-4xl">Travel Places</h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
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
          {/* <CarouselContent className="-mr-4 ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]"> */}
          <CarouselContent className="-mr-4 ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))]">
            {imagePaths.map((place, index) => (
                <CarouselItem key={index} className="pl-4 md:max-w-[452px]">
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <img
                            src={place.imagePath}
                            alt={place.travelPlaceName}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-lg">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        {index + 1}
                      </div>
                      <div>{place.travelPlaceName}</div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-md text-muted-foreground">
                      <Flame className="h-4 w-4 text-orange-500 " />
                      <div>{place.hotScore}</div>

                      {place.district?.trim() && <div>• {place.district}</div>}
                      {place.travelPlaceType?.trim() && (
                        <div>• {place.travelPlaceType}</div>
                      )}
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                      <div>
                        Lat: {place.latitude} | Long: {place.longitude}
                      </div>
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
export default TravelDisplayPage;

// travelPlaceName
// hotScore travelPlaceType
// district longitude latitude

// travelPlaceName
// travelPlaceType
// district
// longitude
// latitude
// hotScore

//'Thalang District'
//'Mueang Phuket District'
//'Kathu District'
