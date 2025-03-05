import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedProp, setSharedProp] = useState('Hello from context!');
  const [formValues, setFormValues] = useState({ username: "", theme: "" });
  const [service, setService] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  return (
    <AppContext.Provider value={{ sharedProp, setSharedProp, formValues, setFormValues, service, setService, restaurants, setRestaurants }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);