import "./general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ label, className = "", onClick, icon }) {
  return (
    <button
      type="button"
      className={`general-button ${className}`.trim()}
      onClick={onClick}
    >
      {icon && (
        <span className="general-button__icon">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span className="general-button__label">{label}</span>
    </button>
  );
}