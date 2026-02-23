import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Header({ userUsername, setIsLoggedIn }) {
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">Cinema Guru</div>

      <div className="navbar__right">
        <img
          className="navbar__avatar"
          src="https://picsum.photos/100/100"
          alt="avatar"
        />

        <p className="navbar__welcome">Welcome, {userUsername}</p>

        <span className="navbar__logout" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </span>
      </div>
    </nav>
  );
}