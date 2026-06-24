"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Settings,
  History,
  Menu,
  X,
} from "lucide-react";
import "./styles.css";

export function Sidebar({ isOpen, toggleSidebar }) {
  const navItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/services", icon: <Users size={20} />, label: "Serviços" },
    { to: "/automation", icon: <Settings size={20} />, label: "Automação" },
    { to: "/history", icon: <History size={20} />, label: "Histórico" },
  ];

  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">C</div>
            <span className="logo-text">Cobrança.io</span>
          </div>
          <button className="sidebar-close-btn" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`nav-link ${pathname.startsWith(item.to) ? "active" : ""}`}
              onClick={() => {
                if (window.innerWidth <= 768) {
                  toggleSidebar();
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>

              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

export function MobileHeader({ toggleSidebar }) {
  return (
    <div className="mobile-header">
      <button className="menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>
      <div className="logo-text">Cobrança.io</div>
    </div>
  );
}
