import { useState } from "react";

import Input from "../components/general/Input";
import SelectInput from "../components/general/SelectInput";
import Button from "../components/general/Button";
import SearchBar from "../components/general/SearchBar";

import { faUser, faKey, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function GeneralComponentsDemo() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [minDate, setMinDate] = useState("1970");
  const [sort, setSort] = useState("Default");
  const [title, setTitle] = useState("");

  const options = ["Default", "Latest", "Oldest", "Highest Rated", "Lowest Rated"];

  return (
    <div style={{ minHeight: "100vh", background: "#1b1b1b", padding: 40 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#111", padding: 24, borderRadius: 6 }}>
        <h2 style={{ margin: 0, marginBottom: 20, color: "#fff", fontSize: 18 }}>General components demo</h2>

        <div style={{ display: "grid", gap: 16 }}>
          <Input
            label="Username:"
            type="text"
            value={username}
            setValue={setUsername}
            icon={faUser}
            inputAttributes={{ placeholder: "Your username" }}
          />

          <Input
            label="Password:"
            type="password"
            value={password}
            setValue={setPassword}
            icon={faKey}
            inputAttributes={{ placeholder: "Your password" }}
          />

          <Input
            label="Min Date:"
            type="number"
            value={minDate}
            setValue={setMinDate}
            inputAttributes={{ min: 0, max: 2026 }}
          />

          <SelectInput label="Sort:" options={options} value={sort} setValue={setSort} />

          <Button label="Load More..." icon={faMagnifyingGlass} onClick={() => alert("Clicked!")} />

          <SearchBar title={title} setTitle={setTitle} />
        </div>

        <pre style={{ marginTop: 20, color: "#bdbdbd", fontSize: 12 }}>
{JSON.stringify({ username, password, minDate, sort, title }, null, 2)}
        </pre>
      </div>
    </div>
  );
}