import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import type {
  FieldValues,
  FieldErrors,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export interface InputFormProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  className?: string;
  options: {
    value: string;
    label: string;
  }[];
}

export interface SwitchProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}