import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
  };

export const DataProvider = ({ children }) => {
  const [data, setData] = useState("test");

  const setRecipeData = (newData) => {
    setData(newData);
  };

  return (
    <DataContext.Provider value={{ data, setRecipeData }}>
      {children}
    </DataContext.Provider>
  );
};





