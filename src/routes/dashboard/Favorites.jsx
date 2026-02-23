import { useEffect, useState } from "react";
import axios from "axios";

import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/titles/favorite/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMovies(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <h1 className="page__title">
  <span className="page__title--underline">
    Movies you like
  </span>
</h1>
      <ul className="movies-grid">
        {movies.map((m) => (
          <MovieCard key={m.imdbId} movie={m} />
        ))}
      </ul>
    </div>
  );
}