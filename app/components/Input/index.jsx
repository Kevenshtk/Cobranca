import "./styles.css";

export function Input({ label, error, className = "", id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`input-field ${error ? "input-error" : ""}`}
        {...props}
      />

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export function InputForm({
  label,
  id,
  type = "text",
  errors,
  register,
  className = "",
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        className={`input-field ${errors?.[inputId] ? "input-error" : ""}`}
        {...register(inputId, { required: `${label} é obrigatório` })}
        {...props}
      />

      {errors?.[inputId] && (
        <span className="input-error-message">{errors?.[inputId].message}</span>
      )}
    </div>
  );
}

export function Select({
  label,
  error,
  options,
  className = "",
  id,
  ...props
}) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="input-label">
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={`input-field select-field ${error ? "input-error" : ""}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export function Switch({ label, checked, onChange, className = "", id }) {
  const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`switch-group ${className}`}>
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`switch-btn ${checked ? "switch-checked" : ""}`}
      >
        <span
          className={`switch-thumb ${checked ? "switch-thumb-checked" : ""}`}
        />
      </button>

      {label && (
        <span className="switch-label" onClick={() => onChange(!checked)}>
          {label}
        </span>
      )}
    </div>
  );
}
