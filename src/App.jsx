import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Home from "./pages/Home";
import About from "./pages/About";
import CarouselPage from "./pages/CarouselPage";
import TablePage from "./pages/TablePage";
import TableHome from "./pages/TableHome";

function App() {
  const [activeTab1, setActiveTab1] = useState("/");
  const [activeTab2, setActiveTab2] = useState("/TableHome");

  return (
    <AppProvider>
      <div className="bg-green-2 text-white min-h-[60vh] ">
        <div className="pl-24">
          <TabsNavigation1
            activeTab={activeTab1}
            setActiveTab={setActiveTab1}
          />
          <div>
            {activeTab1 === "/" && <Home />}
            {activeTab1 === "/about" && <About />}
          </div>
        </div>
      </div>
      <div>
        <CarouselPage />
      </div>
      <div>
        <TabsNavigation2 activeTab={activeTab2} setActiveTab={setActiveTab2} />
        <div>
          {activeTab2 === "/TableHome" && <TableHome />}
          {activeTab2 === "/table" && <TablePage />}
        </div>
      </div>
    </AppProvider>
  );
}

const TabsNavigation1 = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      value={activeTab}
      className="w-[1000px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="bg-green-2"> 
        <TabsTrigger
          value="/"
          className="w-64 px-4 py-2 text-lg data-[state=active]:bg-green-3 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
        >
          Home
        </TabsTrigger>
        <TabsTrigger
          value="/about"
          className="w-64 px-4 py-2 text-lg data-[state=active]:bg-green-3 data-[state=active]:text-white data-[state=inactive]:text-gray-300"
        >
          About
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const TabsNavigation2 = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      value={activeTab}
      className="w-[400px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList>
        <TabsTrigger value="/TableHome">Table Home</TabsTrigger>
        <TabsTrigger value="/table">Table</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default App;
