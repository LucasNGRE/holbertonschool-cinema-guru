import "./general.css";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Input({
  label,
  type = "text",
  className = "",
  value,
  setValue,
  icon,
  inputAttributes = {},
}) {
  const [showPassword, setShowPassword] = useState(false);

  const computedType = useMemo(() => {
    if (type !== "password") return type;
    return showPassword ? "text" : "password";
  }, [type, showPassword]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const isPassword = type === "password";

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
          type={computedType}
          value={value ?? ""}
          onChange={handleInput}
          {...inputAttributes}
        />

        {isPassword && (
          <button
            type="button"
            className="general-input__toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
    </div>
  );
}