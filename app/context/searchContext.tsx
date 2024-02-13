import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Providing a default value directly in createContext call
const SearchContext = createContext<SearchContextType>({
  searchQuery: "",
  setSearchQuery: () => {}, // Implementing a no-op function as a placeholder
});

export function useSearch() {
  return useContext(SearchContext);
}

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const value = { searchQuery, setSearchQuery };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
