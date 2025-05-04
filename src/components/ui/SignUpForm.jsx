import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const SignUpForm = ({ onSuccess }) => {
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

  const travelPlaceTypes = [
    "Beach",
    "Natural",
    "TownAndCity",
    "Cultural",
    "ShoppingAndDining",
    "EntertainmentAndNightLife",
    "HealthAndWellness",
  ];
  const districts = [
    "Thalang District",
    "Kathu District",
    "Mueang Phuket District",
  ];
  const raceTypes = [
    { value: "FunRun", label: "Fun Run" },
    { value: "MiniMarathon", label: "Mini Marathon" },
    { value: "HalfMarathon", label: "Half Marathon" },
    { value: "Marathon", label: "Marathon" },
  ];
  const typeofEvents = [
    { value: "CharityEvent", label: "Charity Event" },
    { value: "CompetitiveEvent", label: "Competitive Event" },
  ];
  const prices = ["Economy", "Average", "Premium"];

  const organizations = [
    { value: "SirirojHospital", label: "Siriroj Hospital" },
    { value: "RedCrossPhuket", label: "Red Cross Phuket" },
    { value: "PhuketNightRun", label: "Phuket Night Run" },
    { value: "RawaiMunicipality", label: "Rawai Municipality" },
    {
      value: "MarriottInternationalHotel",
      label: "Marriott International Hotel",
    },
    { value: "MoveAsia", label: "MoveAsia" },
    { value: "BangkokAirways", label: "Bangkok Airways" },
    { value: "RotaryPhuket", label: "Rotary Phuket" },
    { value: "RunForLife", label: "Run For Life" },
    { value: "LagunaPhuket", label: "Laguna Phuket" },
  ];
  const activityAreas = ["Natural", "City"];

  const standards = [
    { value: "StandardEvent", label: "Standard Event" },
    { value: "No", label: "Not Standard Event" },
  ];

  const levels = [
    { value: "InternationalEvent", label: "International Event" },
    { value: "LocalEvent", label: "Local Event" },
  ];
  const startPeriods = ["Morning", "Evening", "Night"];
  const rewards = [
    { value: "Medal", label: "Medal" },
    { value: "Prize", label: "Prize" },
    { value: "Certificate", label: "Certificate" },
    { value: "FinisherShirt", label: "Finisher Shirt" },
  ];

  const formSchema = z.object({
    username: z.string(),
    password: z.string(),
    PostRunCarbConsumtion: z.string(),
    PostRunFatConsumtion: z.string(),
    PostRunProteinConsumtion: z.string(),
    PreRunCarbConsumtion: z.string(),
    PreRunFatConsumtion: z.string(),
    PreRunProteinConsumtion: z.string(),
    hasRestaurantTypeInterest: z.string(),
    RunnerType: z.string(),
    BudgetInteresets: z.string(),
    hasFoodTypeInterests: z
      .array(z.string())
      .nonempty({ message: "Food type interest is required." }),
    travelPlaceType: z.string(),
    district: z.string(),
    raceType: z.string(),
    typeofEvent: z.string(),
    price: z.string(),
    organization: z.string(),
    activityArea: z.string(),
    standard: z.string(),
    level: z.string(),
    startPeriod: z.string(),
    reward: z.string(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      PostRunCarbConsumtion: "Medium",
      PostRunFatConsumtion: "Medium",
      PostRunProteinConsumtion: "Medium",
      PreRunCarbConsumtion: "Medium",
      PreRunFatConsumtion: "Medium",
      PreRunProteinConsumtion: "Medium",
      hasRestaurantTypeInterest: "Fine_Dining_Type",
      RunnerType: "Fun run",
      BudgetInteresets: JSON.stringify([301, 600]),
      hasFoodTypeInterests: [
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
      ],
      travelPlaceType: "Natural",
      district: "Thalang District",
      raceType: "FunRun",
      typeofEvent: "CharityEvent",
      price: "Economy",
      organization: "SirirojHospital",
      activityArea: "Natural",
      standard: "StandardEvent",
      level: "InternationalEvent",
      startPeriod: "Morning",
      reward: "Medal",
    },
  });

  const onSubmit = async (values) => {
    let budgetInterests = JSON.parse(values.BudgetInteresets);
    if (!Array.isArray(budgetInterests)) {
      budgetInterests = [budgetInterests];
    }
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://project3.demo/schema">
      <soapenv:Header />
      <soapenv:Body>
          <sch:createUserProfileRequest>
                <username>${values.username}</username>
            <password>${values.password}</password>
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
              <travelPlaceType>${values.travelPlaceType}</travelPlaceType>
              <district>${values.district}</district>
              <raceType>${values.raceType}</raceType>
              <typeofEvent>${values.typeofEvent}</typeofEvent>
              <price>${values.price}</price>
              <organization>${values.organization}</organization>
              <activityArea>${values.activityArea}</activityArea>
              <standard>${values.standard}</standard>
              <level>${values.level}</level>
              <startPeriod>${values.startPeriod}</startPeriod>
              <reward>${values.reward}</reward>
          </sch:createUserProfileRequest>
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
      const res =
        parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
          "ns3:createUserProfileResponse"
        ];
      const status = parseInt(res["status"]);
      const message = res["message"];

      onSuccess();
      if (status === 0) {
        toast.success("Create Accrount Successful");
        onSuccess();
      } else {
        toast.error(message || "Invalid");
        form.reset();
      }
    } catch (error) {
      toast.error("Unable to contact server. Please try again.");
      console.error("SOAP request error:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex">
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input id="username" type="text" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-[600px] grid grid-cols-3 gap-4">
                {/* Post Run Carb Consumption */}
                <FormField
                  control={form.control}
                  name="PostRunCarbConsumtion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post-Run Carb Consumption</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
              <div className="w-[600px]">
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
                          <div className="grid grid-cols-3 gap-2">
                            {foodTypes.map((type) => (
                              <div key={type} className="flex items-center">
                                <input
                                  type="checkbox"
                                  value={type}
                                  checked={field.value.includes(type)}
                                  onChange={(e) => {
                                    const updatedValues = e.target.checked
                                      ? [...field.value, type]
                                      : field.value.filter(
                                          (value) => value !== type
                                        );
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
            </div>
            <div>
              <Separator orientation="vertical" />
            </div>
            <div className="flex-col">
              <div className="w-[600px] grid grid-cols-3 gap-4 h-1/2 ml-2">
                <FormField
                  control={form.control}
                  name="travelPlaceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travel Place Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Travel Place Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {travelPlaceTypes.map((type) => (
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

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select District" />
                          </SelectTrigger>
                          <SelectContent>
                            {districts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
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
                  name="raceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Race Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Race Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {raceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
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
                  name="typeofEvent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Event</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Type of Event" />
                          </SelectTrigger>
                          <SelectContent>
                            {typeofEvents.map((event) => (
                              <SelectItem key={event.value} value={event.value}>
                                {event.label}
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Price" />
                          </SelectTrigger>
                          <SelectContent>
                            {prices.map((price) => (
                              <SelectItem key={price} value={price}>
                                {price}
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
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Organization" />
                          </SelectTrigger>
                          <SelectContent>
                            {organizations.map((org) => (
                              <SelectItem key={org.value} value={org.value}>
                                {org.label}
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
                  name="activityArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Area</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Activity Area" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityAreas.map((area) => (
                              <SelectItem key={area} value={area}>
                                {area}
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
                  name="standard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Standard</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Standard" />
                          </SelectTrigger>
                          <SelectContent>
                            {standards.map((standard) => (
                              <SelectItem
                                key={standard.value}
                                value={standard.value}
                              >
                                {standard.label}
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
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
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
                  name="startPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Period</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Start Period" />
                          </SelectTrigger>
                          <SelectContent>
                            {startPeriods.map((period) => (
                              <SelectItem key={period} value={period}>
                                {period}
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
                  name="reward"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reward</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Reward" />
                          </SelectTrigger>
                          <SelectContent>
                            {rewards.map((reward) => (
                              <SelectItem
                                key={reward.value}
                                value={reward.value}
                              >
                                {reward.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className=" m-4 w-full">Create account</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SignUpForm;
