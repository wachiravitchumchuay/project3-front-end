import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CarouselPage from "./pages/CarouselPage";
import FormHomePage from "./pages/FormHomePage";


function App() {
  const [activeTab, setActiveTab] = useState("/HomePage");

  return (
    <AppProvider>
      <div className="font-body ">
        <div className="bg-green-2 text-white min-h-[50vh] ">
          <div className="pl-24">
            <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
              {activeTab === "/HomePage" && <HomePage />}
              {activeTab === "/AboutPage" && <AboutPage />}
            </div>
          </div>
        </div>
        <div>
          <CarouselPage />
          <FormHomePage />
        </div>
      </div>
    </AppProvider>
  );
}

const TabsNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      value={activeTab}
      className="w-[1000px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="bg-green-2">
        <TabsTrigger
          value="/HomePage"
          className="w-64 px-4 py-2 text-lg data-[state=active]:bg-green-3 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
        >
          Home
        </TabsTrigger>
        <TabsTrigger
          value="/AboutPage"
          className="w-64 px-4 py-2 text-lg data-[state=active]:bg-green-3 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
        >
          About
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default App;
