import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Home from './pages/Home';
import About from './pages/About';
import CarouselPage from './pages/CarouselPage';
import TablePage from './pages/TablePage';
import './App.css';

function App() {
  const [activeTab1, setActiveTab1] = useState('/');
  const [activeTab2, setActiveTab2] = useState('/carousel');

  return (
    <AppProvider>
      <div>
        <TabsNavigation1 activeTab={activeTab1} setActiveTab={setActiveTab1} />
        <div>
          {activeTab1 === '/' && <Home />}
          {activeTab1 === '/about' && <About />}
        </div>
      </div>
      <div>
        <TabsNavigation2 activeTab={activeTab2} setActiveTab={setActiveTab2} />
        <div>
          {activeTab2 === '/carousel' && <CarouselPage />}
          {activeTab2 === '/table' && <TablePage />}
        </div>
      </div>
    </AppProvider>
  );
}

const TabsNavigation1 = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} className="w-[400px]" onValueChange={(value) => setActiveTab(value)}>
      <TabsList>
        <TabsTrigger value="/">Home</TabsTrigger>
        <TabsTrigger value="/about">About</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

const TabsNavigation2 = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs value={activeTab} className="w-[400px]" onValueChange={(value) => setActiveTab(value)}>
      <TabsList>
        <TabsTrigger value="/carousel">Carousel</TabsTrigger>
        <TabsTrigger value="/table">Table</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default App;
