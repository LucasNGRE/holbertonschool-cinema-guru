import "./general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Input({
  label,
  type = "text",
  className = "",
  value,
  setValue,
  icon,
  inputAttributes = {},
}) {
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`general-input ${className}`.trim()}>
      {label && <label className="general-input__label">{label}</label>}

      <div className="general-input__field">
        {icon && (
          <span className="general-input__icon">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}

        <input
          className="general-input__control"
          type={type}
          value={value ?? ""}
          onChange={handleInput}
          {...inputAttributes}
        />
      </div>
    </div>
  );
}