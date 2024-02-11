"use client";
import { useState } from "react";

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
    <section id="landing-page" className="min-h-screen bg-gray-100">
      <nav className="flex justify-between items-center py-4 px-8">
        <figure>
          <img
            src="https://dev.d24jig8s1lr7n9.amplifyapp.com/img/blinker-icon.4f9b2663.png"
            alt="logo"
            className="w-40 h-10"
          />
        </figure>
        <ul className="flex space-x-4">
          <li className="text-gray-800">HOME</li>
        </ul>
      </nav>
      <header className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold my-4">Browse Our Movies</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            id="movieSearch"
            className="form-input mt-1 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search by Title"
            value={movieSearch}
            onChange={(e) => setMovieSearch(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {isLoading ? (
          <div className="mt-4">Loading...</div>
        ) : (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <img className="w-full" src={movie.Poster} alt="Movie poster" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{movie.Title}</div>
                  <p className="text-gray-700 text-base">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </section>
  );
}
