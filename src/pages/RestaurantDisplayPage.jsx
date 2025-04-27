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
  return path
};

const RestaurantDisplayPage = () => {
  const { restaurants } = useAppContext();
  return (
    <div className="w-full">
      <ScrollArea className="max-h-[700px] w-full overflow-auto">
        <div className="grid grid-cols-5 gap-4 p-4">
          {restaurants.map((restaurant, index) => {
            const imagePath = getRandomImagePath(restaurant.restaurant_type);

            return (
              <Card key={index}>
                <CardContent className="h-[200px] p-0">
                  
                  <img
                    src={imagePath}
                    alt={restaurant.restaurant_name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-md"
                  />
                </CardContent>
                <div className="p-2">
                  <p className="text-sm font-semibold">
                    {restaurant.restaurant_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {restaurant.restaurant_type}
                    
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
export default RestaurantDisplayPage;
