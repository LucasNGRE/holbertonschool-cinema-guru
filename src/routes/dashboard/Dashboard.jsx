import "./dashboard.css";
import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";

import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />

      <div className="dashboard__layout">
        <SideBar />

        <div className="dashboard__content">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlater" element={<WatchLater />} />

            {/* default */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}