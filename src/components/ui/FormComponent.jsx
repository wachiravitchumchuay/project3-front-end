import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form1 from "./Form1";
import Form2 from "./Form2";


const FormComponent = () => {

  return (
    <div>
      <Tabs defaultValue="1" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="1">Form1</TabsTrigger>
          <TabsTrigger value="2">Form2</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Form1/>
        </TabsContent>
        <TabsContent value="2">
          <Form2/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormComponent;