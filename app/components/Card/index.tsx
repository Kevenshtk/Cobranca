import type { ReactNode, HTMLAttributes  } from "react";

import "./styles.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
}

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'warning' | false;
  trendLabel?: string;
}

export function Card({ children, className = "", title }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}

      <div className="card-body">{children}</div>
    </div>
  );
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
}: StatCardProps) {
  return (
    <div className="card stat-card">
      <div className="stat-card-header">
        <h3 className="stat-title">{title}</h3>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
      <div className="stat-value">{value}</div>
      {trend && (
        <div className="stat-footer">
          {trend && (
            <span
              className={`stat-trend ${trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-warning"}`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"} {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
