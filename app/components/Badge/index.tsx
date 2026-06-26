import "./styles.css";

interface BadgeProps {
  children: React.ReactNode;
  variant: "default" | "success" | "warning" | "danger" | "primary";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>{children}</span>
  );
}
