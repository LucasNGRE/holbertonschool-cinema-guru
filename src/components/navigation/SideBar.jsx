import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./navigation.css";
import Activity from "../Activity";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faStar,
  faClock,
  faChevronRight,
  faChevronLeft,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const navigate = useNavigate();
  const sideBarRef = useRef(null);

  const [selected, setSelected] = useState("home");
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const setPage = (pageName) => {
    setSelected(pageName);

    if (pageName === "home") navigate("/home");
    if (pageName === "favorites") navigate("/favorites");
    if (pageName === "watchlater") navigate("/watchlater");
  };

  // Fetch activities
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/activity", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setActivities(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error(err);
        setActivities([]);
      });
  }, []);

  // Close sidebar when clicking outside (only when expanded)
  useEffect(() => {
    if (small) return;

    const handleOutsideClick = (e) => {
      const el = sideBarRef.current;
      if (!el) return;

      // if click is outside sidebar -> close it
      if (!el.contains(e.target)) {
        setSmall(true);
        setShowActivities(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [small]);

  // Open sidebar when clicking anywhere on it (only if small)
  const handleSidebarClick = () => {
    if (small) setSmall(false);
  };

  return (
    <nav
      ref={sideBarRef}
      className={`sidebar ${small ? "sidebar--small" : ""}`}
      onClick={handleSidebarClick}
    >
      <div className="sidebar__top">
        <button
          type="button"
          className="sidebar__toggle"
          onClick={(e) => {
            e.stopPropagation(); // prevent nav click from re-opening/closing weirdly
            setSmall((v) => !v);
            if (!small) setShowActivities(false);
          }}
          aria-label={small ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FontAwesomeIcon icon={small ? faChevronRight : faChevronLeft} />
        </button>
      </div>

      {/* Navigation */}
      <ul className="sidebar__nav" onClick={(e) => e.stopPropagation()}>
        <li
          className={`sidebar__item ${selected === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          <FontAwesomeIcon className="sidebar__icon" icon={faFolder} />
          {!small && <span className="sidebar__text">Home</span>}
        </li>

        <li
          className={`sidebar__item ${selected === "favorites" ? "active" : ""}`}
          onClick={() => setPage("favorites")}
        >
          <FontAwesomeIcon className="sidebar__icon" icon={faStar} />
          {!small && <span className="sidebar__text">Favorites</span>}
        </li>

        <li
          className={`sidebar__item ${
            selected === "watchlater" ? "active" : ""
          }`}
          onClick={() => setPage("watchlater")}
        >
          <FontAwesomeIcon className="sidebar__icon" icon={faClock} />
          {!small && <span className="sidebar__text">Watch Later</span>}
        </li>
      </ul>

      {/* Activities */}
      {!small && (
        <div className="sidebar__activities" onClick={(e) => e.stopPropagation()}>
          <div
            className="sidebar__activitiesHeader"
            onClick={() => setShowActivities((v) => !v)}
          >
            <div className="sidebar__activitiesTitle">
              <FontAwesomeIcon icon={faListUl} />
              <span>Activities</span>
            </div>
            <FontAwesomeIcon
              className={`sidebar__chev ${showActivities ? "open" : ""}`}
              icon={faChevronRight}
            />
          </div>

          {showActivities && (
            <ul className="sidebar__activitiesList">
              {activities.slice(0, 10).map((a, idx) => (
                <Activity key={a.id ?? idx} activity={a} />
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
}