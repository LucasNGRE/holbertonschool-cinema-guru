import "./components.css";

export default function Activity({ activity }) {
  if (!activity) return null;

  const username = activity.user?.username ?? "Unknown";
  const title = activity.title?.title ?? "Unknown title";

  // watch later ou favorites
  const action =
    activity.type === "favorite"
      ? "to favorites"
      : "to watch later";

  // format date
  const date = new Date(activity.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li className="activity-item">
      <p className="activity-text">
        <strong>{username}</strong> added{" "}
        <strong>{title}</strong> {action} - {formattedDate}
      </p>
    </li>
  );
}