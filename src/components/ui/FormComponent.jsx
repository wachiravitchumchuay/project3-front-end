import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/context/AppContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form1 from "./Form1";
import Form2 from "./Form2";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  theme: z.string().nonempty({
    message: "Theme is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }).optional(),
  color: z.string().nonempty({
    message: "Color is required.",
  }).optional(),
});

const FormComponent = () => {
  const { setFormValues } = useAppContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      theme: "",
      email: "",
      color: "",
    },
  });

  function onSubmit(values) {
    setFormValues(values);
    console.log(values);
  }

  return (
    <div>
      <Tabs defaultValue="1" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="1">Form1</TabsTrigger>
          <TabsTrigger value="2">Form2</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Form1 form={form} onSubmit={onSubmit} />
        </TabsContent>
        <TabsContent value="2">
          <Form2 form={form} onSubmit={onSubmit} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormComponent;