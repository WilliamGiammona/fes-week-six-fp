"use client";

import { useState } from "react";
import Nav from "./components/nav/nav";
interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

export default function Home() {
  const [movieSearch, setMovieSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (search: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=897b61cc&s=${search}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 6));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data from OMDB API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchMovies(movieSearch);
    setMovieSearch(""); // Clear the search field
  };

  return (
    <section id="landing-page" className="landing-page">
      <Nav />
      <header className="hero">
        <h1 className="hero__title ">Browse Our Movies</h1>
        <form className="hero__form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="movieSearch"
            className="form__input"
            placeholder="Search by Title"
            value={movieSearch}
            onChange={(e) => setMovieSearch(e.target.value)}
          />
          <button type="submit" className="form__submit__btn">
            Submit
          </button>
        </form>
        {isLoading ? (
          <div className="mt-4">Loading...</div>
        ) : (
          <div className="hero__movies__wrapper">
            {movies.map((movie, index) => (
              <div key={index} className="hero__movies__movie ">
                <figure className="hero__movies__movie__poster__img__wrapper">
                  <img
                    className="hero__movies__movie__poster__img"
                    src={movie.Poster}
                    alt="Movie poster"
                  />
                </figure>
                <div className="px-6 py-4">
                  <div className="hero__movies__title text-center">
                    {movie.Title}
                  </div>
                  <p className="hero__movies__year text-center">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </section>
  );
}
