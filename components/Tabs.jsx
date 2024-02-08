"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useTabsContext } from "@/app/TabsContext"; 


const Tabs = () => {
  const { selectedTab, setSelectedTab } = useTabsContext();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="tabs mb-5">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
          <Link href={"/"}
           
            className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 ${
              selectedTab === "All"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-600"
            } text-sm whitespace-nowrap focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active`}
            id="tabs-with-underline-item-1"
            onClick={() => handleTabClick("All")}
            role="tab"
          >
            All
          </Link>
          <Link href={"/like"}
            
            className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 ${
              selectedTab === "Likes"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-600"
            } text-sm whitespace-nowrap focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active`}
            id="tabs-with-underline-item-2"
            onClick={() => handleTabClick("Likes")}
            role="tab"
          >
            Likes
          </Link>
          <Link href={"/download"}
           
            className={`py-4 px-1 inline-flex items-center gap-x-2 border-b-2 ${
              selectedTab === "Downloads"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-600"
            } text-sm whitespace-nowrap focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active`}
            id="tabs-with-underline-item-3"
            onClick={() => handleTabClick("Downloads")}
            role="tab"
          >
            Downloads
          </Link>
        </nav>
      </div>

    

    </div>


  );
};

export default Tabs;
