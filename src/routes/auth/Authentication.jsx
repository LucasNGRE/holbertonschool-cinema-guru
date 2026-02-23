import { useState } from "react";
import axios from "axios";
import "./auth.css";

import Login from "./Login";
import Register from "./Register";

export default function Authentication({ setIsLoggedIn, setUserUsername }) {
  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = _switch
      ? "http://localhost:8000/api/auth/login"
      : "http://localhost:8000/api/auth/register";

    try {
      const res = await axios.post(url, { username, password });

      // le backend peut renvoyer token sous différents noms
      const token =
        res.data?.accessToken || res.data?.token || res.data?.jwt || res.data?.access_token;

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      setUserUsername(username);
      setIsLoggedIn(true);
    } catch (err) {
      // Tu peux afficher une erreur plus tard (toast / message)
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      setUserUsername("");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${_switch ? "active" : ""}`}
            onClick={() => setSwitch(true)}
          >
            Sign In
          </button>

          <button
            type="button"
            className={`auth-tab-btn ${!_switch ? "active" : ""}`}
            onClick={() => setSwitch(false)}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-content">
          {_switch ? (
            <Login
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          ) : (
            <Register
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          )}
        </div>
      </form>
    </div>
  );
}