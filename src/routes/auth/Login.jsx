import "./auth.css";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

export default function Login({ username, password, setUsername, setPassword }) {
  return (
    <>
      <h2 className="auth-title">Sign in with your account</h2>

      <div className="auth-fields">
        <Input
          label="Username:"
          type="text"
          value={username}
          setValue={setUsername}
          icon={faUser}
        />

        <Input
          label="Password:"
          type="password"
          value={password}
          setValue={setPassword}
          icon={faKey}
        />
      </div>

      <div className="auth-actions">
        <Button label="Sign In" onClick={() => {}} icon={faKey} />
      </div>
    </>
  );
}