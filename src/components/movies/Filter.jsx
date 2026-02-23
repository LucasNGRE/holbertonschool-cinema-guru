import "./movies.css";

import SearchBar from "../general/SearchBar";
import Input from "../general/Input";
import SelectInput from "../general/SelectInput";
import Tag from "./Tag";

export default function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) {
  const SORT_OPTIONS = [
    { value: "", label: "Default" },
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "highestrated", label: "Highest Rated" },
    { value: "lowestrated", label: "Lowest Rated" },
  ];

  const TAGS = [
    "Action",
    "Drama",
    "Comedy",
    "Biography",
    "Romance",
    "Thriller",
    "War",
    "History",
    "Sport",
    "Sci-Fi",
    "Documentary",
    "Crime",
    "Fantasy",
  ];

  return (
  <div className="filter">
    <div className="filter__layout">
      {/* LEFT : inputs */}
      <div className="filter__left">
        <div className="filter__row">
          <SearchBar title={title} setTitle={setTitle} />

          <Input
            label="Min Date:"
            type="number"
            value={minYear}
            setValue={setMinYear}
            inputAttributes={{ min: 0 }}
          />

          <Input
            label="Max Date:"
            type="number"
            value={maxYear}
            setValue={setMaxYear}
            inputAttributes={{ min: 0 }}
          />

          <SelectInput
            label="Sort:"
            options={SORT_OPTIONS}
            value={sort}
            setValue={setSort}
          />
        </div>
      </div>

      {/* RIGHT : tags */}
      <div className="filter__right">
        <ul className="tags tags--right">
          {TAGS.map((g) => (
            <Tag
              key={g}
              genre={g}
              filter={true}
              genres={genres}
              setGenres={setGenres}
            />
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}