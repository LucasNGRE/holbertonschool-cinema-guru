import "./components.css";

export default function Activity({ activity }) {
  if (!activity) return null;

  return (
    <li className="activity-item">
      <p className="activity-text">
        <strong>{activity.user?.username}</strong>{" "}
        {activity.type}{" "}
        <strong>{activity.title?.title}</strong>
      </p>
    </li>
  );
}