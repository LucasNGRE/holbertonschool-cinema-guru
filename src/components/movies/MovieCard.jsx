import { useEffect, useState } from "react";
import axios from "axios";
import "./movies.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const imdbId = movie?.imdbId;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !imdbId) return;

    const headers = { Authorization: `Bearer ${token}` };

    const fetchLists = async () => {
      try {
        const [favRes, wlRes] = await Promise.all([
          axios.get("http://localhost:8000/api/titles/favorite/", { headers }),
          axios.get("http://localhost:8000/api/titles/watchlater/", { headers }),
        ]);

        const favList = Array.isArray(favRes.data) ? favRes.data : [];
        const wlList = Array.isArray(wlRes.data) ? wlRes.data : [];

        setIsFavorite(favList.some((t) => t.imdbId === imdbId));
        setIsWatchLater(wlList.some((t) => t.imdbId === imdbId));
      } catch (err) {
        console.error(err);
      }
    };

    fetchLists();
  }, [imdbId]);

  const handleClick = async (type) => {
    const token = localStorage.getItem("accessToken");
    if (!token || !imdbId) return;

    const headers = { Authorization: `Bearer ${token}` };
    const url = `http://localhost:8000/api/titles/${type}/${encodeURIComponent(
      imdbId
    )}`;

    const currentlyOn = type === "favorite" ? isFavorite : isWatchLater;

    try {
      if (currentlyOn) {
        await axios.delete(url, { headers });
        if (type === "favorite") setIsFavorite(false);
        if (type === "watchlater") setIsWatchLater(false);
      } else {
        await axios.post(url, {}, { headers });
        if (type === "favorite") setIsFavorite(true);
        if (type === "watchlater") setIsWatchLater(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!movie) return null;

  const poster =
    Array.isArray(movie.imageurls) && movie.imageurls.length > 0
      ? movie.imageurls[0]
      : "https://via.placeholder.com/400x250?text=No+Poster";

  const title = movie.title ?? "Untitled";
  const plot = movie.synopsis ?? "";
  const genres = Array.isArray(movie.genres) ? movie.genres : [];

  return (
    <li className="movie-card">
      <div className="movie-card__posterWrap">
        <img
          className="movie-card__poster"
          src={poster}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/400x250?text=No+Poster";
          }}
        />

        <div className="movie-card__actions">
          <span
            className={`movie-card__icon ${isWatchLater ? "active" : ""}`}
            onClick={() => handleClick("watchlater")}
            title="Watch later"
          >
            <FontAwesomeIcon icon={faClock} />
          </span>

          <span
            className={`movie-card__icon ${isFavorite ? "active" : ""}`}
            onClick={() => handleClick("favorite")}
            title="Favorite"
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        </div>

        <h3 className="movie-card__title">{title}</h3>
      </div>

      <div className="movie-card__body">

        <p className="movie-card__plot">
          {plot.length > 90 ? `${plot.slice(0, 90)}...` : plot}
        </p>

        <div className="movie-card__genres">
          {genres.map((g) => (
            <span key={g} className="movie-card__genre">
              {g}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}