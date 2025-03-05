import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .optional(),
  theme: z
    .string()
    .nonempty({
      message: "Theme is required.",
    })
    .optional(),
});

const Form1 = () => {
  const { setFormValues, setRestaurants } = useAppContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      theme: "",
    },
  });

  async function onSubmit(values) {
    setFormValues(values);
    console.log("Form Values:", values);

    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://project3.demo/schema">
         <soapenv:Header/>
         <soapenv:Body>
            <sch:getRestaurantRequest/>
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
      console.log("Raw XML Response:", xmlData);
      const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true,
      });
  
      const parsedData = parser.parse(xmlData);
  
      console.log("Parsed XML Response:", parsedData);
      
      // const restaurantName = parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns3:getRestaurantResponse"].restaurants[0].restaurant_name
      const restaurants = parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns3:getRestaurantResponse"].restaurants

      console.log("Restaurants :", restaurants);
      setRestaurants(restaurants);

    } catch (error) {
      console.error("Error making SOAP request:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>form1</FormLabel>
              <FormControl className="">
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl className="0">
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[180px] ">
                    <SelectValue className="" placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Form1;