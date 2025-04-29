import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/context/AppContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const nutrientLevels = ["Low", "Medium", "High"];
const runnerTypes = ["Fun run", "Mini Marathon", "Half Marathon", "Marathon"];
const budgetRanges = [
  { value: [0, 300], label: "0 - 300 Baht" },
  { value: [301, 600], label: "301 - 600 Baht" },
  { value: [601, 900], label: "601 - 900 Baht" },
  { value: [901, 1200], label: "901 - 1200 Baht" },
  { value: [1201, 1500], label: "1201 - 1500 Baht" },
  { value: [1501, 1800], label: "1501 - 1800 Baht" },
  { value: [1801, 2100], label: "1801 - 2100 Baht" },
  { value: [2101, 999999], label: "More than 2100 Baht" },
];

const restaurantTypes = [
  { value: "Kiosk_Type", label: "Kiosk Type" },
  { value: "Fast_Dining_Type", label: "Fast Dining Type" },
  { value: "Casual_Dining_Type", label: "Casual Dining Type" },
  { value: "Fine_Dining_Type", label: "Fine Dining Type" },
];

const foodTypes = [
  "ALaCarte_Type",
  "Bakery_Cake_Type",
  "Breakfast_Type",
  "BubbleMilkTea_Type",
  "Buffet_Type",
  "CleanFood_Salad_Type",
  "Dessert_Type",
  "Dimsum_Type",
  "DrinksJuice_Type",
  "FastFood_Type",
  "Grill_Type",
  "GrilledPork_Type",
  "IceCream_Type",
  "Noodles_Type",
  "Omakase_Type",
  "OneDishMeal_Type",
  "Pizza_Type",
  "Ramen_Type",
  "Seafood_Type",
  "Shabu_Sukiyaki_Type",
  "Steak_Type",
  "Sushi_Type",
  "VegatarianFood_Type",
  "Vegatarian_Jay_Type",
  "Burger_Type",
];

const formSchema = z.object({
  PostRunCarbConsumtion: z
    .string()
    .nonempty({ message: "Post-run carb consumption is required." }),
  PostRunFatConsumtion: z
    .string()
    .nonempty({ message: "Post-run fat consumption is required." }),
  PostRunProteinConsumtion: z
    .string()
    .nonempty({ message: "Post-run protein consumption is required." }),
  PreRunCarbConsumtion: z
    .string()
    .nonempty({ message: "Pre-run carb consumption is required." }),
  PreRunFatConsumtion: z
    .string()
    .nonempty({ message: "Pre-run fat consumption is required." }),
  PreRunProteinConsumtion: z
    .string()
    .nonempty({ message: "Pre-run protein consumption is required." }),
  hasRestaurantTypeInterest: z
    .string()
    .nonempty({ message: "Restaurant type interest is required." }),
  RunnerType: z.string().nonempty({ message: "Runner type is required." }),
  BudgetInteresets: z
    .string()
    .nonempty({ message: "At least two budget interests are required." }),
  hasFoodTypeInterests: z
    .array(z.string())
    .nonempty({ message: "Food type interest is required." }),
});

const ResRecForm = () => {
  const { setRestaurants, setRunningEvents, setTravelPlaces } = useAppContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PostRunCarbConsumtion: "Medium",
      PostRunFatConsumtion: "Medium",
      PostRunProteinConsumtion: "Medium",
      PreRunCarbConsumtion: "Medium",
      PreRunFatConsumtion: "Medium",
      PreRunProteinConsumtion: "Medium",
      hasRestaurantTypeInterest: "Fine_Dining_Type",
      RunnerType: "Fun run",
      BudgetInteresets: JSON.stringify([301, 600]),
      hasFoodTypeInterests: [],
    },
  });

  const onSubmit = async (values) => {
    let budgetInterests = JSON.parse(values.BudgetInteresets);
    if (!Array.isArray(budgetInterests)) {
      budgetInterests = [budgetInterests];
    }
    console.log(values);
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://project3.demo/schema">
         <soapenv:Header/>
         <soapenv:Body>
            <sch:getRestaurantRecommendationRequest>
               <PreRunCarbConsumtion>${
                 values.PreRunCarbConsumtion
               }</PreRunCarbConsumtion>
               <PreRunFatConsumtion>${
                 values.PreRunFatConsumtion
               }</PreRunFatConsumtion>
               <PreRunProteinConsumtion>${
                 values.PreRunProteinConsumtion
               }</PreRunProteinConsumtion>
               <PostRunCarbConsumtion>${
                 values.PostRunCarbConsumtion
               }</PostRunCarbConsumtion>
               <PostRunFatConsumtion>${
                 values.PostRunFatConsumtion
               }</PostRunFatConsumtion>
               <PostRunProteinConsumtion>${
                 values.PostRunProteinConsumtion
               }</PostRunProteinConsumtion>
               <RunnerType>${values.RunnerType}</RunnerType>
               <BudgetInteresets>
                  <BudgetIntereset>${budgetInterests[0]}</BudgetIntereset>
                  <BudgetIntereset>${budgetInterests[1]}</BudgetIntereset>
               </BudgetInteresets>
               <hasRestaurantTypeInterest>${
                 values.hasRestaurantTypeInterest
               }</hasRestaurantTypeInterest>
               <hasFoodTypeInterests>
                  ${values.hasFoodTypeInterests
                    .map(
                      (food) =>
                        `<hasFoodTypeInterest>${food}</hasFoodTypeInterest>`
                    )
                    .join("")}
               </hasFoodTypeInterests>
            </sch:getRestaurantRecommendationRequest>
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

      const restaurants =
        parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
          "ns3:getRestaurantRecommendationResponse"
        ].restaurants;
      console.table(restaurants);
      setRestaurants([]);
      setRunningEvents([]);
      setTravelPlaces([]);
      setRestaurants(restaurants);
    } catch (error) {
      console.error("Error making SOAP request:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 3x3 Grid for Selections */}
        <div className="w-[600px] grid grid-cols-3 gap-4">
          {/* Post Run Carb Consumption */}
          <FormField
            control={form.control}
            name="PostRunCarbConsumtion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post-Run Carb Consumption</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Post-Run Carb Consumption" />
                    </SelectTrigger>
                    <SelectContent>
                      {nutrientLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Run Fat Consumption */}
          <FormField
            control={form.control}
            name="PostRunFatConsumtion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post-Run Fat Consumption</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Post-Run Fat Consumption" />
                    </SelectTrigger>
                    <SelectContent>
                      {nutrientLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Run Protein Consumption */}
          <FormField
            control={form.control}
            name="PostRunProteinConsumtion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post-Run Protein Consumption</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Post-Run Protein Consumption" />
                    </SelectTrigger>
                    <SelectContent>
                      {nutrientLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pre Run Carb Consumption */}
          <FormField
            control={form.control}
            name="PreRunCarbConsumtion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pre-Run Carb Consumption</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Pre-Run Carb Consumption" />
                    </SelectTrigger>
                    <SelectContent>
                      {nutrientLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pre Run Fat Consumption */}
          <FormField
            control={form.control}
            name="PreRunFatConsumtion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pre-Run Fat Consumption</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Pre-Run Fat Consumption" />
                    </SelectTrigger>
                    <SelectContent>
                      {nutrientLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pre Run Protein Consumption */}
          <FormField
            control={form.control}
            name="PreRunProteinConsumtion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pre-Run Protein Consumption</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Pre-Run Protein Consumption" />
                    </SelectTrigger>
                    <SelectContent>
                      {nutrientLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Runner Type */}
          <FormField
            control={form.control}
            name="RunnerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Runner Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Runner Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {runnerTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Budget Interests */}
          <FormField
            control={form.control}
            name="BudgetInteresets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Runner Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((type) => (
                        <SelectItem
                          key={type.label}
                          value={JSON.stringify(type.value)}
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasRestaurantTypeInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Type Interest</FormLabel>
                <FormControl>
                  <Select
                    multiple
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Restaurant Type Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      {restaurantTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>

        {/* Food Type Interests */}
        <div className="w-[900px]">
          <FormField
            control={form.control}
            name="hasFoodTypeInterests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Type Interests</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div>
                      <input
                        type="checkbox"
                        value="Select All"
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange(foodTypes);
                          } else {
                            field.onChange([]);
                          }
                        }}
                      />
                      <label>Select All</label>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {foodTypes.map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            value={type}
                            checked={field.value.includes(type)}
                            onChange={(e) => {
                              const updatedValues = e.target.checked
                                ? [...field.value, type]
                                : field.value.filter((value) => value !== type);
                              field.onChange(updatedValues);
                            }}
                          />
                          <label>{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ResRecForm;
