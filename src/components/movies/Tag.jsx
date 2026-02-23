import { useEffect, useState } from "react";
import "./movies.css";

export default function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  // Si le parent met à jour genres, on synchronise selected
  useEffect(() => {
    setSelected(genres.includes(genre));
  }, [genres, genre]);

  const handleTag = () => {
    if (selected) {
      setGenres(genres.filter((g) => g !== genre));
      setSelected(false);
    } else {
      setGenres([...genres, genre]);
      setSelected(true);
    }
  };

  return (
    <li
      className={`tag ${filter ? "tag--filter" : ""} ${
        selected ? "tag--selected" : ""
      }`.trim()}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
}