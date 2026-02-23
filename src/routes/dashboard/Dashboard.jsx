import "./dashboard.css";
import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";

export default function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />

      <div className="dashboard__layout">
        <SideBar />

        <div className="dashboard__content">
          <div className="dashboard__panel"></div>
        </div>
      </div>
    </div>
  );
}