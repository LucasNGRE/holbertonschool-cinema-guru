import { useState } from "react";
import "./auth.css";

import Login from "./Login";
import Register from "./Register";

export default function Authentication(props) {
  const { setIsLoggedIn, setUserUsername } = props;

  // éviter le warning ESLint "unused vars"
  void setIsLoggedIn;
  void setUserUsername;

  const [_switch, setSwitch] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-page">
      <form className="auth-card">
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