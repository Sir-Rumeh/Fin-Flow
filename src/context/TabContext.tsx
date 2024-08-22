import React, { createContext, ReactNode, useState, useContext } from 'react';

type TabContextType = {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

// Create a custom hook for consuming the TabContext
export const useTabContext = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabContextProvider');
  }
  return context;
};

type TabContextProviderProps = {
  children: ReactNode;
};

export const TabContextProvider = ({ children }: TabContextProviderProps) => {
  const [tab, setTab] = useState(1);

  return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
};
