"use client";

import React, { useState } from "react";
import { MovieSearchProvider } from "./contexts/MovieSearchContext";
import Nav from "./components/nav/nav";
import styles from "./components/header/header.module.css";

export default function Home() {
  const [movieSearch, setMovieSearch] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(movieSearch);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieSearch(event.target.value);
  };

  return (
    <MovieSearchProvider>
      <section id="landing-page">
        <Nav />
        <header className={styles.hero}>
          <h1 className={styles.hero__title}>Browse Our Movies</h1>
          <form className={styles.hero__form} onSubmit={handleSubmit}>
            <label htmlFor="movieSearch" className={styles.form__label}></label>
            <input
              type="text"
              id="movieSearch"
              className={styles.form__input}
              placeholder="Search by Title"
              value={movieSearch}
              onChange={handleInputChange}
            />
            <button type="submit" className={styles.form__submit__btn}>
              Submit
            </button>
          </form>
        </header>
      </section>
    </MovieSearchProvider>
  );
}
