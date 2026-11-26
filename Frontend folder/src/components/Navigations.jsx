import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Assessments", href: "/assessments", aliases: ["/assesments"] },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics", aliases: ["/analysis"] },
  { label: "History", href: "/history" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
  { label: "More", href: "/information" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { openAuth, theme, toggleTheme } = useAuth();
  const currentPath = window.location.pathname;

  return (
    <nav className="navbar flex w-full items-center justify-between bg-teal-600   drop-shadow-xl/50 backdrop-blur-sm ">
      <a className="navbar-brand flex" href="/" onClick={() => setIsOpen(false)} aria-label="Mythiorapy home">
        <span className="brand-script flex m-5 justify-start  text-3xl bg-transparent  ">Mythiorapy</span>
                
      </a>

      <button
        className="navbar-toggle "
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul
        className={`navbar-menu flex flex-row items-center justify-end gap-6 font-sans font-bold ${
          isOpen ? "is-open" : ""
        }`}
      >
        {navLinks.map((link) => {
          const isActive =
                        currentPath === link.href ||
                        link.aliases?.includes(currentPath);

          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar-link transition-colors duration-300 ${
                  isActive ? "is-active" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="auth-actions ml-auto flex items-center gap-3 px-4">
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
        </button>
        <a
          href="/login"
          onClick={(event) => {
            event.preventDefault();
            openAuth("login");
          }}
          className="login rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/20"
        >
          Login
        </a>
        <a
          href="/register"
          onClick={(event) => {
            event.preventDefault();
            openAuth("register");
          }}
          className="btn rounded-lg bg-cyan-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-cyan-700"
        >
          Register
        </a>
      </div>
    </nav>
  );
}
