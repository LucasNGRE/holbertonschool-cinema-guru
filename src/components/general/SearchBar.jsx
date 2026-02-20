import "./general.css";

export default function SearchBar({ title, setTitle }) {
  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="general-searchbar">
      <input
        className="general-searchbar__input"
        type="text"
        value={title ?? ""}
        onChange={handleInput}
        placeholder="Search..."
      />
    </div>
  );
}