import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedProp, setSharedProp] = useState('Hello from context!');

  return (
    <AppContext.Provider value={{ sharedProp, setSharedProp }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
