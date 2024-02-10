"use client";

import styles from "./header.module.css";
import React, { useRef, FormEvent } from "react";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

const Header = () => {
  const movieInputRef = useRef<HTMLInputElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const movieWrapperRef = useRef<HTMLDivElement>(null);

  const movieChoice = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movieInput = movieInputRef.current;
    const spinner = spinnerRef.current;
    const movieWrapper = movieWrapperRef.current;

    if (!movieInput || !spinner || !movieWrapper) {
      console.error("One of the refs is null");
      return;
    }

    let movieList = movieInput.value;

    movieInput.value = "";
    spinner.style.display = "block";

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=897b61cc&s=${movieList}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
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
      <div>
        <figure>
          <img src="${movie.Poster}" alt="Movie poster" />
        </figure>
        <h2>${movie.Title}</h2>
        <h3>${movie.Year}</h3>
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

  return (
    <header className={styles.hero}>
      <h1 className={styles.hero__title}>Browse Our Movies</h1>
      <form className={styles.hero__form} onSubmit={movieChoice}>
        <label htmlFor="movieSearch" className={styles.form__label}></label>
        <input
          ref={movieInputRef}
          type="text"
          id="movieSearch"
          className={styles.form__input}
          placeholder="Search by Title"
        />
        <button type="submit" className={styles.form__submit__btn}>
          Submit
        </button>
      </form>
      <div ref={spinnerRef} className={styles.hero__movies__loading}></div>
      <div ref={movieWrapperRef} className={styles.hero__movies__wrapper}></div>
    </header>
  );
};

export default Header;
