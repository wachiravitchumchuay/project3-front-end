import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";

const SignInForm = ({ onSuccess }) => {
  const { setUserData } = useAppContext();
  const formSchema = z.object({
    username: z.string().nonempty({ message: "username is required." }),
    password: z.string().nonempty({ message: "password is required." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sch="http://project3.demo/schema">
        <soapenv:Header />
        <soapenv:Body>
          <sch:getUserProfileRequest>
            <username>${values.username}</username>
            <password>${values.password}</password>
          </sch:getUserProfileRequest>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
      const response = await axios.post("http://localhost:8080/ws", soapBody, {
        headers: {
          "Content-Type": "text/xml",
        },
      });

      const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true,
      });
      const parsedData = parser.parse(response.data);

      const res =
        parsedData["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
          "ns3:getUserProfileResponse"
        ];
      const status = parseInt(res["status"]);
      const message = res["message"];
      

      if (status === 0) {
        const newData = {
            username: res["username"],
            district: res["district"],
            raceType: res["raceType"],
            typeofEvent: res["typeofEvent"],
            travelPlaceType: res["travelPlaceType"],
            price: res["price"],
            organization: res["organization"],
            activityArea: res["activityArea"],
            standard: res["standard"],
            level: res["level"],
            startPeriod: res["startPeriod"],
            reward: res["reward"],
            PostRunCarbConsumtion: res["PostRunCarbConsumtion"],
            PostRunFatConsumtion: res["PostRunFatConsumtion"],
            PostRunProteinConsumtion: res["PostRunProteinConsumtion"],
            PreRunCarbConsumtion: res["PreRunCarbConsumtion"],
            PreRunFatConsumtion: res["PreRunFatConsumtion"],
            PreRunProteinConsumtion: res["PreRunProteinConsumtion"],
            hasRestaurantTypeInterest: res["hasRestaurantTypeInterest"],
            RunnerType: res["RunnerType"],
            BudgetInterests: res["BudgetInterests"]?.["BudgetInterest"] ?? [],
            hasFoodTypeInterests: res["hasFoodTypeInterests"]?.["hasFoodTypeInterest"] ?? [],
          };
          console.log(newData)
          setUserData(newData);
        toast.success("Sign In Successful");
        onSuccess();
      } else {
        toast.error(message || "Invalid username or password.");
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 text-center"
        >
          <div className="grid gap-6 w-full">
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
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>

          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
