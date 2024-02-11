import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const defaultContextValue: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultContextValue);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const value = { searchTerm, setSearchTerm };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export function useSearch() {
  return useContext(SearchContext);
}
