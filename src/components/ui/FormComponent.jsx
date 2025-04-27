import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";


const FormComponent = () => {

  return (
    <div>
      <Tabs defaultValue="1" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="1">All Restaurants</TabsTrigger>
          <TabsTrigger value="2">Restaurant Recommendations</TabsTrigger>
          <TabsTrigger value="3">ALL Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <Form1/>
        </TabsContent>
        <TabsContent value="2">
          <Form2/>
        </TabsContent>
        <TabsContent value="3">
          <Form3/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormComponent;