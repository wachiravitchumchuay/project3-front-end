import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";


const Form3 = () => {
  const { setRestaurants, setRunningEvents, setTravelPlaces } = useAppContext();

  const handleClick = async () => {
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://project3.demo/schema">
      <soapenv:Header />
      <soapenv:Body>
          <sch:getAllRecommendationRequest>
              <PreRunCarbConsumtion>Medium</PreRunCarbConsumtion>
              <PreRunFatConsumtion>Medium</PreRunFatConsumtion>
              <PreRunProteinConsumtion>Medium</PreRunProteinConsumtion>
              <PostRunCarbConsumtion>Medium</PostRunCarbConsumtion>
              <PostRunFatConsumtion>Medium</PostRunFatConsumtion>
              <PostRunProteinConsumtion>Medium</PostRunProteinConsumtion>
              <RunnerType>Fun run</RunnerType>
              <BudgetInteresets>
                  <BudgetIntereset>301</BudgetIntereset>
                  <BudgetIntereset>600</BudgetIntereset>
              </BudgetInteresets>
              <hasRestaurantTypeInterest>Fast_Dining_Type</hasRestaurantTypeInterest>
              <hasFoodTypeInterests>
                  <hasFoodTypeInterest>ALaCarte_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Bakery_Cake_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Breakfast_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>BubbleMilkTea_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Buffet_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Burger_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>CleanFood_Salad_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Dessert_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Dimsum_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>DrinksJuice_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>FastFood_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Grill_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>GrilledPork_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>IceCream_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Noodles_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Omakase_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>OneDishMeal_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Pizza_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Ramen_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Seafood_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Shabu_Sukiyaki_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Steak_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Sushi_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>VegatarianFood_Type</hasFoodTypeInterest>
                  <hasFoodTypeInterest>Vegatarian_Jay_Type</hasFoodTypeInterest>
              </hasFoodTypeInterests>
              <travelPlaceType>Natural</travelPlaceType>
              <district>Thalang District</district>
              <raceType>FunRun</raceType>
              <typeofEvent>CharityEvent</typeofEvent>
              <price>Average</price>
              <organization>SirirojHospital</organization>
              <activityArea>Natural</activityArea>
              <standard>StandardEvent</standard>
              <level>InternationalEvent</level>
              <startPeriod>Morning</startPeriod>
              <reward>Medal</reward>
          </sch:getAllRecommendationRequest>
      </soapenv:Body>
  </soapenv:Envelope>
      `;
    try {
      const response = await axios.post("http://localhost:8080/ws", soapBody, {
        headers: {
          "Content-Type": "text/xml",
        },
      });
      const xmlData = response.data;
      const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true,
      });
      const parsedData = parser.parse(xmlData);
  
      const restaurants = parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns3:getAllRecommendationResponse"].restaurants;
      const runningEvents = parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns3:getAllRecommendationResponse"].runningEvents;
      const travelPlaces = parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns3:getAllRecommendationResponse"].travelPlaces;
  
      console.table(restaurants);
      console.table(runningEvents);
      console.log(runningEvents)
      console.table(travelPlaces);

      setRestaurants(restaurants);
      setRunningEvents(runningEvents);
      setTravelPlaces(travelPlaces);
    } catch (error) {
      console.error("Error making SOAP request:", error);
    }
  };
  
  return (
    <div>
      Form3
      <Button onClick={handleClick}>TESTESTSTST</Button>
    </div>
  );
};
export default Form3;
