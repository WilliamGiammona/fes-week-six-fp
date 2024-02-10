import { createContext, useContext, useState, ReactNode } from "react";

interface MovieSearchContextType {
  movieSearch: string;
  setMovieSearch: (value: string) => void;
}

const MovieSearchContext = createContext<MovieSearchContextType | undefined>(
  undefined
);

export const MovieSearchProvider = ({ children }: { children: ReactNode }) => {
  const [movieSearch, setMovieSearch] = useState("");

  return (
    <MovieSearchContext.Provider value={{ movieSearch, setMovieSearch }}>
      {children}
    </MovieSearchContext.Provider>
  );
};

export const useMovieSearch = () => {
  const context = useContext(MovieSearchContext);
  if (context === undefined) {
    throw new Error("useMovieSearch must be used within a MovieSearchProvider");
  }
  return context;
};
