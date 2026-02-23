import "./dashboard.css";

import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <BrowserRouter>
      <div className="dashboard">

        {/* Header */}
        <Header
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />

        {/* Layout */}
        <div className="dashboard__layout">

          {/* Sidebar */}
          <SideBar />

          {/* Content */}
          <div className="dashboard__content">

            <Routes>

              <Route
                path="/home"
                element={<HomePage />}
              />

              <Route
                path="/favorites"
                element={<Favorites />}
              />

              <Route
                path="/watchlater"
                element={<WatchLater />}
              />

              {/* default redirect */}
              <Route
                path="*"
                element={<Navigate to="/home" />}
              />

            </Routes>

          </div>

        </div>

      </div>
    </BrowserRouter>
  );
}