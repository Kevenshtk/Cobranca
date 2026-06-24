import './styles.css';

export function Card({ children, className = '', title, action }) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {action && <div className="card-action">{action}</div>}
        </div>
      )}

      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

export function StatCard({ title, value, icon, description, trend, trendLabel }) {
  return (
    <div className="card stat-card">
      <div className="stat-card-header">
        <h3 className="stat-title">{title}</h3>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
      <div className="stat-value">{value}</div>
      {(description || trend) && (
        <div className="stat-footer">
          {trend && (
            <span className={`stat-trend ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-warning'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendLabel}
            </span>
          )}
          
          {description && <span className="stat-description">{description}</span>}
        </div>
      )}
    </div>
  );
}
