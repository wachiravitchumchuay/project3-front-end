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

const RunningDisplayPage = () => {
  const { travelPlaces } = useAppContext();
  return (
    <div>
        <p className="font-head text-4xl"> Running Event </p>
    </div>
  );
};
export default RunningDisplayPage;
