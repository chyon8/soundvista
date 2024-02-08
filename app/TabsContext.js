"use client"
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('All');

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabsContext = () => useContext(TabsContext);
