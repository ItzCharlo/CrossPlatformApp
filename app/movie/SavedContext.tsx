import React, { createContext, useState, useContext, ReactNode } from "react";

interface Movie {
  id: number;
  title: string;
  [key: string]: any; // Andre felter fra TMDB
}

interface SavedMoviesContextType {
  savedMovies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: number) => void;
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const SavedMoviesProvider = ({ children }: ProviderProps) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  const addMovie = (movie: Movie) => {
    if (!savedMovies.some((m) => m.id === movie.id)) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  const removeMovie = (movieId: number) => {
    setSavedMovies(savedMovies.filter((m) => m.id !== movieId));
  };

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, addMovie, removeMovie }}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);
  if (!context) {
    throw new Error("useSavedMovies must be used within a SavedMoviesProvider");
  }
  return context;
};
