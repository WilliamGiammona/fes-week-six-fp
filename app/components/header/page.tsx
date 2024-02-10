// app/components/header/page.tsx
"use client";

import React, { useRef, FormEvent, useEffect } from "react";
import { useMovieSearch } from "../../contexts/MovieSearchContext"; // Adjust the import path as needed
import styles from "./header.module.css";
import Nav from "../nav/nav";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

const Header = () => {
  const { movieSearch } = useMovieSearch();
  const spinnerRef = useRef<HTMLDivElement>(null);
  const movieWrapperRef = useRef<HTMLDivElement>(null);

  const movieChoice = async () => {
    const spinner = spinnerRef.current;
    const movieWrapper = movieWrapperRef.current;

    if (!spinner || !movieWrapper) {
      console.error("One of the refs is null");
      return;
    }

    spinner.style.display = "block";

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=897b61cc&s=${movieSearch}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!data.Search || data.Search.length === 0) {
        movieWrapper.innerHTML =
          "<p>Sorry, no movies with this title found.</p>";
        spinner.style.display = "none";
        return;
      }

      movieWrapper.innerHTML = data.Search.slice(0, 6)
        .map(
          (movie: Movie) => `
          <div class="${styles.hero__movies__movie}">
            <figure class="${styles.hero__movies__movie__poster__img__wrapper}">
              <img class="${styles.hero__movies__movie__poster__img}" src="${movie.Poster}" alt="Movie poster" />
            </figure>
            <h2 class="${styles.hero__movies__title}">${movie.Title}</h2>
            <h3 class="${styles.hero__movies__year}">${movie.Year}</h3>
          </div>
        `
        )
        .join("");

      spinner.style.display = "none";
    } catch (error) {
      console.error("Error fetching data from OMDB API:", error);
      spinner.style.display = "none";
    }
  };

  useEffect(() => {
    if (movieSearch) {
      movieChoice();
    }
  }, [movieSearch]); // Re-run movieChoice when movieSearch updates

  return (
    <>
      <Nav />
      <header className={styles.hero}>
        <h1 className={styles.hero__title}>
          Selection For &quot; {movieSearch} &quot;
        </h1>
        <div ref={spinnerRef} className={styles.hero__movies__loading}></div>
        <div
          ref={movieWrapperRef}
          className={styles.hero__movies__wrapper}
        ></div>
      </header>
    </>
  );
};

export default Header;
