import { useEffect } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useAppContext } from "@/context/AppContext";
//TODO fix double request debouce?
const AllResForm = () => {
  const { setRestaurants } = useAppContext();

  useEffect(() => {
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://project3.demo/schema">
         <soapenv:Header/>
         <soapenv:Body>
            <sch:getRestaurantRequest/>
         </soapenv:Body>
      </soapenv:Envelope>
    `;

    async function fetchRestaurants() {
      try {
        const response = await axios.post(
          "http://localhost:8080/ws",
          soapBody,
          {
            headers: {
              "Content-Type": "text/xml",
            },
          }
        );

        const xmlData = response.data;
        const parser = new XMLParser({
          ignoreAttributes: false,
          ignoreDeclaration: true,
        });
        const parsedData = parser.parse(xmlData);
        const restaurants =
          parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
            "ns3:getRestaurantResponse"
          ].restaurants;
        
        console.table(restaurants)
        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error making SOAP request:", error);
      }
    }

    fetchRestaurants();
  }, [setRestaurants]);

  return null;
};

export default AllResForm;
