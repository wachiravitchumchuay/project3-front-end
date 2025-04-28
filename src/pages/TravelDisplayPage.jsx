import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppContext } from "../context/AppContext";
//TODO img optimize WebP format?
const getRandomImagePath = (type) => {
  const randomIndex = Math.floor(Math.random() * 5) + 1;
  const path = `/restaurant/${type}/${type}${randomIndex}.jpg`;
  return path;
};

const TravelDisplayPage = () => {
  const { travelPlaces } = useAppContext();
  return (
    <div className="w-full">
      <p className="font-head text-4xl"> Travel Place </p>
      <ScrollArea className="max-h-[600px] w-full overflow-auto">
        <div className="grid grid-cols-5 gap-4 p-4">
          {travelPlaces.map((travelPlaces, index) => {
            const imagePath = getRandomImagePath(travelPlaces.restaurant_type);

            return (
              <Card key={index} className="group overflow-hidden">
                <CardContent className="h-[250px] p-0">
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={imagePath}
                      alt={travelPlaces.restaurant_name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold">
                      {travelPlaces.travelPlaceName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {travelPlaces.district}
                    </p>
                    <p className="text-xs text-gray-500">
                      {travelPlaces.travelPlaceType}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
export default TravelDisplayPage;
