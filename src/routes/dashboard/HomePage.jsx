import { useEffect, useState } from "react";
import axios from "axios";

import "../dashboard/dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import Button from "../../components/general/Button";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState(""); // "" = Latest (default backend)
  const [title, setTitle] = useState("");

  const [page, setPage] = useState(1);

  const loadMovies = async (pageToLoad) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:8000/api/titles/advancedsearch", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          minYear,
          maxYear,
          genres: genres.join(","),
          title,
          sort, // "" => latest, "oldest" => oldest
          page: pageToLoad,
        },
      });

      const newTitles = Array.isArray(res.data?.titles) ? res.data.titles : [];

      if (pageToLoad === 1) setMovies(newTitles);
      else setMovies((prev) => [...prev, ...newTitles]);

      setPage(pageToLoad);
    } catch (err) {
      console.error(err);
    }
  };

  // Au mount + à chaque changement de filtre => reset page=1 et reload
  useEffect(() => {
    setPage(1);
    loadMovies(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minYear, maxYear, sort, title, genres]);

  return (
    <div className="page">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />

      <ul className="movies-grid">
        {movies.map((m) => (
          <MovieCard key={m.imdbId} movie={m} />
        ))}
      </ul>

      <div className="page__actions">
        <Button label="Load More.." onClick={() => loadMovies(page + 1)} />
      </div>
    </div>
  );
}