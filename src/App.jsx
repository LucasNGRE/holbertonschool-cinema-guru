import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Authentication from "./routes/auth/Authentication";
import Dashboard from "./routes/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    axios
      .post(
        "http://localhost:8000/api/auth/",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setIsLoggedIn(true);
        setUserUsername(res.data.username ?? "");
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserUsername("");
      });
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Dashboard userUsername={userUsername} />
      ) : (
        <Authentication
          setIsLoggedIn={setIsLoggedIn}
          setUserUsername={setUserUsername}
        />
      )}
    </div>
  );
}