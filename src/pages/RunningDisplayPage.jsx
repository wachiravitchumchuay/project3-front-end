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
            <TableHead>Rewards</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runningEvents.map((runningEvent, index) => (
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
                {runningEvent.raceTypes.raceType.map((item) => (
                  <p>{item} </p>
                ))}
              </TableCell>
              <TableCell>
                {typeof runningEvent.prices.price === 'string' ? (
                  <p>{runningEvent.prices.price}</p>
                ) : (
                  Array.isArray(runningEvent.prices.price) &&
                  runningEvent.prices.price.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))
                )}
              </TableCell>
              <TableCell>
                {typeof runningEvent.rewards.reward === 'string' ? (
                  <p>{runningEvent.rewards.reward}</p>
                ) : (
                  Array.isArray(runningEvent.rewards.reward) &&
                  runningEvent.rewards.reward.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))
                )}
              </TableCell>
            </TableRow>
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
