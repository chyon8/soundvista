"use client"
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
const TabsContext = createContext();
import { useEffect } from 'react';

export const TabsProvider = ({ children }) => {


 
  useEffect(() => {

 if(window.location.pathname=='/'){
  setSelectedTab('All')}
else if(window.location.pathname=='/like'){
  setSelectedTab('Likes')}
  else if (window.location.pathname=='/download'){
    setSelectedTab('Downloads')
  }
   
  }, []); 

  const [selectedTab, setSelectedTab] = useState('');

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabsContext = () => useContext(TabsContext);
