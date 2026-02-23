import MovieCard from "../../components/movies/MovieCard";

export default function HomePage() {
  const fake = {
    imdbId: "tt1234567",
    title: "Takkar",
    synopsis: "Some synopsis text here...",
    poster: "https://picsum.photos/400/250",
    genres: ["Drama"],
  };

  return (
    <ul style={{ padding: 20, display: "flex", gap: 16 }}>
      <MovieCard movie={fake} />
    </ul>
  );
}