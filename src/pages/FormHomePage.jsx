// eslint-disable-next-line
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator"
import AllResForm from "../components/ui/AllResForm";
import ResRecForm from "../components/ui/ResRecForm";
import AllRecForm from "../components/ui/AllRecForm";
import RestaurantDisplayPage from "./RestaurantDisplayPage";
import TravelDisplayPage from "./TravelDisplayPage";
import RunningDisplayPage from "./RunningDisplayPage";
import { useAppContext } from "../context/AppContext";

const FormHomePage = () => {
  const { restaurants, travelPlaces, runningEvents } = useAppContext();
  const [showFormHomePage, setShowFormHomePage] = useState(true);
  return (
    <div>
      {showFormHomePage ? (
        //true
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-green-3 flex flex-col justify-center items-center">
            <div className="pt-18 flex flex-col justify-center items-center text-center">
              <p className="font-head text-6xl">Recommender</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, ullam!
              </p>
            </div>
            <div className="p-6">
              <Button onClick={() => setShowFormHomePage(false)}>Start</Button>
            </div>
          </div>
        </motion.div>
      ) : (
        //false
        <div className=" text-black pl-24 pr-24 pt-6">
          <Button onClick={() => setShowFormHomePage(true)}>Close</Button>
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>All Restaurants</AccordionTrigger>
              <AccordionContent>
                <AllResForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Restaurant Recommendations</AccordionTrigger>
              <AccordionContent>
                <ResRecForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>ALL Recommendations</AccordionTrigger>
              <AccordionContent>
                <AllRecForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {((restaurants && restaurants.length > 0) ||
            (travelPlaces && travelPlaces.length > 0) ||
            (runningEvents && runningEvents.length > 0)) && (
            <div>
              <div className="pt-16 pb-8">
                <div className="container">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-4xl">Result</h2>
                  </div>
                  <div className="">
                    <div className="flex gap-5 text-3xl">
                      {(restaurants && restaurants.length > 0) && (
                        <div className="flex ">
                          <p>Restaurant: {restaurants.length}</p>
                          
                        </div>
                      )}
                      {(travelPlaces && travelPlaces.length > 0) && (
                        <div className="flex">
                          <Separator orientation="vertical" />
                          <p>Travel Place: {travelPlaces.length}</p>
                          
                        </div>
                      )}
                      {(runningEvents && runningEvents.length > 0) && (
                        <div className="flex">
                          <Separator orientation="vertical" />
                          <p>Running Event: {runningEvents.length}</p>
                          
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {restaurants && restaurants.length > 0 && <RestaurantDisplayPage />}
          {travelPlaces && travelPlaces.length > 0 && <TravelDisplayPage />}
          {runningEvents && runningEvents.length > 0 && <RunningDisplayPage />}
        </div>
      )}
    </div>
  );
};

export default FormHomePage;
