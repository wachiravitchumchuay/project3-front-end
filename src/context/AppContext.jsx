import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedProp, setSharedProp] = useState('Hello from context!');
  const [formValues, setFormValues] = useState({ username: "", theme: "" });

  return (
    <AppContext.Provider value={{ sharedProp, setSharedProp, formValues, setFormValues }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
