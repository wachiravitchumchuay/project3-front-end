import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RunningTable from "@/components/ui/RunningTable";
import RunningCard from "@/components/ui/RunningCard";
import { useState } from "react";

const RunningDisplayPage = () => {
  const [activeTab, setActiveTab] = useState("/RunningCard");
  return (
    <div>
      
      <div>
        <div className="flex justify-between">
        <p className="font-head text-4xl"> Running Event </p>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList>
              <TabsTrigger
                value="/RunningCard"
              >
                Card view
              </TabsTrigger>
              <TabsTrigger
                value="/RunningTable"
              >
                Table view
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          {activeTab === "/RunningCard" && <RunningCard />}
          {activeTab === "/RunningTable" && <RunningTable />}
        </div>
      </div>
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
