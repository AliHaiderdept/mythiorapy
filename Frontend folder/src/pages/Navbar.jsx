export default function Navbar() {
  const currentPath = window.location.pathname;
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Assessments", href: "/assessments", aliases: ["/assesments"] },
    { label: "Analytics", href: "/analytics" },
    { label: "History", href: "/history" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 bg-teal-700 px-5 py-4 text-white">
      <a href="/" className="text-xl font-bold">Mythiorapy</a>
      <div className="flex flex-wrap gap-4 text-sm font-semibold">
        {links.map((link) => {
          const isActive = currentPath === link.href || link.aliases?.includes(currentPath);
          return (
            <a
              key={link.href}
              href={link.href}
              className={isActive ? "rounded-md bg-teal-900 px-2 py-1" : ""}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}