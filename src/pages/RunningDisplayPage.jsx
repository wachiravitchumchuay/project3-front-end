import { useAppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { MountainSnow, Flame } from "lucide-react";

const RunningDisplayPage = () => {
  const { runningEvents } = useAppContext();
  return (
    <div>
      <p className="font-head text-4xl"> Running Event </p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            {runningEvents[0]?.confidence && <TableHead>Confidence</TableHead>}
            <TableHead>Name</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Activity Area</TableHead>
            <TableHead>Standard</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Start Period</TableHead>
            <TableHead>Race Types</TableHead>
            <TableHead>Prices</TableHead>
            <TableHead>Reward</TableHead>
            <TableHead>Travel Places</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runningEvents.map((runningEvent, index) => (
            <Drawer direction="right">
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {runningEvent.confidence && (
                  <TableCell>{runningEvent.confidence}</TableCell>
                )}
                <TableCell>{runningEvent.runningEventName}</TableCell>
                <TableCell>{runningEvent.district}</TableCell>
                <TableCell>{runningEvent.typeofEvent}</TableCell>
                <TableCell>{runningEvent.organization}</TableCell>
                <TableCell>{runningEvent.activityArea}</TableCell>
                <TableCell>{runningEvent.standard}</TableCell>
                <TableCell>{runningEvent.level}</TableCell>
                <TableCell>{runningEvent.startPeriod}</TableCell>
                <TableCell>
                  {runningEvent.raceTypes.raceType.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {typeof runningEvent.prices.price === "string" ? (
                    <p>{runningEvent.prices.price}</p>
                  ) : (
                    Array.isArray(runningEvent.prices.price) &&
                    runningEvent.prices.price.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))
                  )}
                </TableCell>
                <TableCell>
                  {typeof runningEvent.rewards.reward === "string" ? (
                    <p>{runningEvent.rewards.reward}</p>
                  ) : (
                    Array.isArray(runningEvent.rewards.reward) &&
                    runningEvent.rewards.reward.map((item, idx) => (
                      <p key={idx}>{item}</p>
                    ))
                  )}
                </TableCell>
                <TableCell>
                  <DrawerTrigger>
                    <MountainSnow className="transition-transform duration-300 hover:scale-115 hover:text-green-700" />
                  </DrawerTrigger>
                </TableCell>
              </TableRow>

              <DrawerContent className="justify-center">
                <DrawerHeader>
                  <DrawerTitle>{runningEvent.runningEventName}</DrawerTitle>
                  <DrawerDescription >
                    Travel places for {runningEvent.runningEventName}
                    <ScrollArea className="h-[1200px]">
                      <div className="mr-11">
                        {runningEvent.travelPlacesRunning.map(
                          (place, index) => (
                            <div className="my-3 rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-auto">
                              <div className="flex items-center gap-2 font-semibold text-lg">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                                  {index + 1}
                                </div>
                                <p>{place.travelPlaceName}</p>
                              </div>

                              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <Flame className="h-4 w-4 text-orange-500" />
                                <p>{place.hotScore}</p>
                                <span>•</span>
                                <p>{place.district}</p>
                                <span>•</span>
                                <p>{place.travelPlaceType}</p>
                              </div>

                              <div className="mt-2 text-xs text-muted-foreground">
                                <p>
                                  Lat: {place.latitude} | Long:{" "}
                                  {place.longitude}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default RunningDisplayPage;
// (index)
// confidence

// runningEventName
// district
// typeofEvent
// organization
// activityArea
// standard
// level
// startPeriod

// raceTypes
// prices
// rewards

// travelPlacesRunning

// travelPlaceName
// hotScore
// travelPlaceType
// district

// latitude
// longitude
