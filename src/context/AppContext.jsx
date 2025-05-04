import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedProp, setSharedProp] = useState('Hello from context!');
  const [formValues, setFormValues] = useState([]);
  const [service, setService] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [runningEvents, setRunningEvents] = useState([]);
  const [travelPlaces, setTravelPlaces] = useState([]);
  const [userData, setUserData] = useState({});
  const [signIn, setSignIn] = useState(false);

  return (
    <AppContext.Provider value={{ 
    sharedProp, setSharedProp, 
    formValues, setFormValues, 
    service, setService, 
    restaurants, setRestaurants, 
    runningEvents, setRunningEvents,
    travelPlaces, setTravelPlaces,
    signIn, setSignIn,
    userData, setUserData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);