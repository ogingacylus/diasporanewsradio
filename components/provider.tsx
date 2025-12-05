// app/providers/data-context-provider.jsx
"use client";

import { createContext, useContext, useState } from "react";

const DataContext = createContext<any>(null);

export function DataContextProvider({
  children,
  showsData,
  newsData,
}: {
  children: any;
  showsData: any;
  newsData: any;
}) {
  const [shows, setData] = useState(showsData);
  const [news, setNews] = useState(newsData);

  return (
    <DataContext.Provider value={{ shows, setData, news, setNews }}>
      {children}
    </DataContext.Provider>
  );
}

export function navData() {
  return useContext(DataContext);
}
