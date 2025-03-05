import { useState } from "react";
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

const nutrientLevels = ["Any", "Low", "Medium", "High"];
const runnerTypes = ["Fun Run", "Mini Marathon", "Half Marathon", "Marathon"];
const budgetRanges = [
  { min: null, max: null, label: "Any Budget" },
  { min: 0, max: 300, label: "0 - 300 Baht" },
  { min: 301, max: 600, label: "301 - 600 Baht" },
  { min: 601, max: 900, label: "601 - 900 Baht" },
  { min: 901, max: 1200, label: "901 - 1200 Baht" },
  { min: 1201, max: 1500, label: "1201 - 1500 Baht" },
  { min: 1501, max: 1800, label: "1501 - 1800 Baht" },
  { min: 1801, max: 2100, label: "1801 - 2100 Baht" },
  { min: 2101, max: 999999, label: "More than 2100 Baht" },
];
const restaurantTypes = [
  "Any Type",
  "Kiosk_Type",
  "Fast_Dining_Type",
  "Casual_Dining_Type",
  "Fine_Dining_Type",
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
  PostRunCarbConsumtion: z.string().nonempty({ message: "Post-run carb consumption is required." }),
  PostRunFatConsumtion: z.string().nonempty({ message: "Post-run fat consumption is required." }),
  PostRunProteinConsumtion: z.string().nonempty({ message: "Post-run protein consumption is required." }),
  PreRunCarbConsumtion: z.string().nonempty({ message: "Pre-run carb consumption is required." }),
  PreRunFatConsumtion: z.string().nonempty({ message: "Pre-run fat consumption is required." }),
  PreRunProteinConsumtion: z.string().nonempty({ message: "Pre-run protein consumption is required." }),
  hasRestaurantTypeInterest: z.string().nonempty({ message: "Restaurant type interest is required." }),
  RunnerType: z.string().nonempty({ message: "Runner type is required." }),
  BudgetInteresets: z.array(z.string()).min(2, { message: "At least two budget interests are required." }),
  hasFoodTypeInterests: z.array(z.string()).nonempty({ message: "Food type interest is required." }),
});

const Form2 = () => {
  const { setFormValues } = useAppContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PostRunCarbConsumtion: "Any",
      PostRunFatConsumtion: "Any",
      PostRunProteinConsumtion: "Any",
      PreRunCarbConsumtion: "Any",
      PreRunFatConsumtion: "Any",
      PreRunProteinConsumtion: "Any",
      hasRestaurantTypeInterest: "Any Type",
      RunnerType: "Fun Run",
      BudgetInteresets: "Any Budget",
      hasFoodTypeInterests: [],
    },
  });

  function onSubmit(values) {
    setFormValues(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* 3x3 Grid for Selections */}
        <div className="w-[600px] grid grid-cols-3 gap-4">
          {/* Post Run Carb Consumption */}
          <FormField control={form.control} name="PostRunCarbConsumtion" render={({ field }) => (
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
          )} />

          {/* Post Run Fat Consumption */}
          <FormField control={form.control} name="PostRunFatConsumtion" render={({ field }) => (
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
          )} />

          {/* Post Run Protein Consumption */}
          <FormField control={form.control} name="PostRunProteinConsumtion" render={({ field }) => (
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
          )} />

          {/* Pre Run Carb Consumption */}
          <FormField control={form.control} name="PreRunCarbConsumtion" render={({ field }) => (
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
          )} />

          {/* Pre Run Fat Consumption */}
          <FormField control={form.control} name="PreRunFatConsumtion" render={({ field }) => (
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
          )} />

          {/* Pre Run Protein Consumption */}
          <FormField control={form.control} name="PreRunProteinConsumtion" render={({ field }) => (
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
          )} />

          {/* Runner Type */}
          <FormField control={form.control} name="RunnerType" render={({ field }) => (
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
          )} />

          {/* Budget Interests */}
          <FormField control={form.control} name="BudgetInteresets" render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Interests</FormLabel>
              <FormControl>
                <Select multiple onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Budget Interests" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        <FormField control={form.control} name="hasRestaurantTypeInterest" render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Type Interest</FormLabel>
              <FormControl>
                <Select multiple onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Restaurant Type Interest" />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurantTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />



        </div>

        {/* Food Type Interests */}
        <div className="w-[900px]">
          <FormField control={form.control} name="hasFoodTypeInterests" render={({ field }) => (
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
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Form2;