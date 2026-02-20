import "./general.css";

export default function SelectInput({
  label,
  options = [],
  className = "",
  value,
  setValue,
}) {
  const handleSelect = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`general-select ${className}`.trim()}>
      {label && <label className="general-select__label">{label}</label>}

      <select
        className="general-select__control"
        value={value ?? ""}
        onChange={handleSelect}
      >
        {options.map((opt, idx) => {
          if (typeof opt === "string" || typeof opt === "number") {
            return (
              <option key={`${opt}-${idx}`} value={opt}>
                {opt}
              </option>
            );
          }

          return (
            <option
              key={opt.value ?? idx}
              value={opt.value ?? ""}
              disabled={Boolean(opt.disabled)}
            >
              {opt.label ?? opt.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}