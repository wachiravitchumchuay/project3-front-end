import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppContext } from "../context/AppContext";

const getRandomImagePath = (type) => {
  const randomIndex = Math.floor(Math.random() * 5) + 1;
  const path = `/restaurant/${type}/${type}${randomIndex}_result.webp`;
  return path;
};

const RestaurantDisplayPage = () => {

  const { restaurants } = useAppContext();
  return (
    <div className="w-full">
      <p className="font-head text-4xl"> Restaurant</p>
      <ScrollArea className="max-h-[600px] w-full overflow-auto">
        <div className="grid grid-cols-5 gap-4 p-4">
          {restaurants.map((restaurant, index) => {
            const imagePath = getRandomImagePath(restaurant.restaurant_type);

            return (
              <Card key={index} className="group overflow-hidden">
                <CardContent className="h-[250px] p-0">
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={imagePath}
                      alt={restaurant.restaurant_name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
                    />
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-semibold">
                      {restaurant.restaurant_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {restaurant.restaurant_type}
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
export default RestaurantDisplayPage;
