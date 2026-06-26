import type { ServiceFormData } from "@/app/types/form.types";
import type {
  InputFormProps,
  InputProps,
  SelectProps,
  SwitchProps,
} from "./inputs.types";

import "./styles.css";

export function Input({
  id,
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`input-field ${error ? "input-error" : ""}`}
        {...props}
      />

      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
}

export function InputForm({
  id,
  label,
  type = "text",
  errors,
  register,
  className = "",
  ...props
}: InputFormProps<ServiceFormData>) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className={`input-field ${errors?.[id] ? "input-error" : ""}`}
        {...register(id, {
          required: `${label} é obrigatório`,
          ...(type === "number" && {
            valueAsNumber: true,
          }),
        })}
        {...props}
      />

      {errors?.[id] && (
        <span className="input-error-message">{errors?.[id].message}</span>
      )}
    </div>
  );
}

export function Select({
  id,
  label,
  options,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}

      <select id={id} className={"input-field select-field"} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Switch({
  id,
  label,
  checked,
  onChange,
  className = "",
}: SwitchProps) {
  const handleToggle = () => {
    onChange(!checked);
  };

  return (
    <div className={`switch-group ${className}`}>
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`switch-btn ${checked ? "switch-checked" : ""}`}
      >
        <span
          className={`switch-thumb ${checked ? "switch-thumb-checked" : ""}`}
        />
      </button>

      {label && (
        <span className="switch-label" onClick={handleToggle}>
          {label}
        </span>
      )}
    </div>
  );
}
