import "./auth.css";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";

import { faUser, faKey, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Register({
  username,
  password,
  setUsername,
  setPassword,
}) {
  return (
    <>
      <h2 className="auth-title">Create a new account</h2>

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
        <Button label="Sign Up" onClick={() => {}} icon={faPlus} />
      </div>
    </>
  );
}