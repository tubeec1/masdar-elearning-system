import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { MdDashboard, MdLogout } from "react-icons/md";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Contact", to: "/contact" },
];

// ─────────────────────────────────────────────
// Avatar: shows profile image or initials fallback
// ─────────────────────────────────────────────
const Avatar = ({ user, size = "md" }) => {
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : "w-9 h-9 text-sm";
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  if (user?.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt={user.name || "Profile"}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-white shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center font-semibold text-white ring-2 ring-white shadow-sm`}
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #10B981 100%)",
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

// ─────────────────────────────────────────────
// ProfileDropdown: dashboard + logout menu
// ─────────────────────────────────────────────
const ProfileDropdown = ({ user, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div
      className="absolute right-0 top-[calc(100%+10px)] w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-dropdown"
      role="menu"
      aria-label="User menu"
    >
      {/* User info header */}
      <div className="px-4 py-3.5 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-emerald-50">
        <div className="flex items-center gap-3">
          <Avatar user={user} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0F172A] truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-[#6B7280] truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        <button
          onClick={handleDashboard}
          role="menuitem"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-emerald-50 hover:text-[#10B981] transition-colors duration-150 group"
        >
          <MdDashboard className="w-4 h-4 text-[#6B7280] group-hover:text-[#10B981] transition-colors duration-150" />
          Dashboard
        </button>

        <div className="mx-3 my-1 border-t border-gray-100" />

        <button
          onClick={handleLogout}
          role="menuitem"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 group"
        >
          <MdLogout className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors duration-150" />
          Log Out
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main PublicNav component
// ─────────────────────────────────────────────

/**
 * Props:
 *   user      — null/undefined when logged out, or { name, email, profileImage } when logged in
 *   onLogout  — callback fired when user clicks Log Out
 *
 * If you use a context (e.g. AuthContext), replace props with useContext(AuthContext).
 */
const PublicNav = ({ user = null, onLogout = () => {} }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const isLoggedIn = Boolean(user);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  // Close profile dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const activeLinkClass = ({ isActive }) =>
    [
      "relative text-sm font-medium transition-colors duration-200",
      "after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full",
      "after:origin-left after:scale-x-0 after:transition-transform after:duration-300",
      "after:bg-[#10B981] hover:after:scale-x-100",
      isActive
        ? "text-[#10B981] after:scale-x-100"
        : "text-[#0F172A] hover:text-[#10B981]",
    ].join(" ");

  return (
    <>
      {/* Dropdown animation style */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown {
          animation: dropdownIn 0.18s ease-out forwards;
        }
      `}</style>

      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300",
          scrolled
            ? "py-2 shadow-md border-b border-gray-100"
            : "py-4 shadow-sm border-b border-transparent",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ── SECTION 1: Logo ── */}
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 flex-shrink-0 group"
              aria-label="Masdar E-Learning — Home"
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-lg transition-transform duration-200 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
                }}
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2L3 6V10C3 13.866 6.13 17.396 10 18C13.87 17.396 17 13.866 17 10V6L10 2Z"
                    fill="#10B981"
                    opacity="0.9"
                  />
                  <path
                    d="M7.5 10L9.5 12L13 8.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[#0F172A] font-bold text-base sm:text-lg leading-tight tracking-tight">
                Masdar <span className="text-[#10B981]">E-Learning</span>
              </span>
            </NavLink>

            {/* ── SECTION 2: Desktop Nav Links ── */}
            <nav
              className="hidden md:flex items-center gap-7"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={activeLinkClass}
                  end={to === "/"}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* ── SECTION 3: Desktop — Auth Buttons OR Profile ── */}
            <div
              className="hidden md:flex items-center gap-3"
              aria-label="Account actions"
            >
              {isLoggedIn ? (
                /* ── Logged In: Profile avatar + dropdown ── */
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className={[
                      "flex items-center gap-2 rounded-full p-0.5 transition-all duration-200",
                      "hover:ring-2 hover:ring-[#10B981] hover:ring-offset-2",
                      profileOpen ? "ring-2 ring-[#10B981] ring-offset-2" : "",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2",
                    ].join(" ")}
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    aria-label="Open user menu"
                  >
                    <Avatar user={user} />
                  </button>

                  {profileOpen && (
                    <ProfileDropdown
                      user={user}
                      onClose={() => setProfileOpen(false)}
                      onLogout={onLogout}
                    />
                  )}
                </div>
              ) : (
                /* ── Logged Out: Sign In + Sign Up ── */
                <>
                  <NavLink
                    to="/signin"
                    className={[
                      "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
                      "border-[#0F172A] text-[#0F172A] bg-transparent",
                      "hover:bg-[#0F172A] hover:text-white",
                    ].join(" ")}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={[
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      "bg-[#10B981] text-white",
                      "hover:bg-[#0d9f72] hover:shadow-md hover:shadow-emerald-200 hover:-translate-y-px",
                    ].join(" ")}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>

            {/* ── Mobile right side: avatar (if logged in) + hamburger ── */}
            <div className="md:hidden flex items-center gap-2">
              {isLoggedIn && (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className={[
                      "rounded-full p-0.5 transition-all duration-200",
                      "hover:ring-2 hover:ring-[#10B981] hover:ring-offset-2",
                      profileOpen ? "ring-2 ring-[#10B981] ring-offset-2" : "",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
                    ].join(" ")}
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    aria-label="Open user menu"
                  >
                    <Avatar user={user} size="sm" />
                  </button>

                  {profileOpen && (
                    <ProfileDropdown
                      user={user}
                      onClose={() => setProfileOpen(false)}
                      onLogout={onLogout}
                    />
                  )}
                </div>
              )}

              <button
                className={[
                  "p-2 rounded-lg transition-colors duration-200",
                  "text-[#0F172A] hover:bg-[#F3F4F6]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]",
                ].join(" ")}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <HiX className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <HiMenu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          id="mobile-menu"
          className={[
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
          aria-hidden={!menuOpen}
        >
          <nav
            className="px-4 pt-3 pb-5 border-t border-gray-100 bg-white space-y-1"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  [
                    "block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-50 text-[#10B981] border-l-2 border-[#10B981] pl-[10px]"
                      : "text-[#0F172A] hover:bg-[#F3F4F6] hover:text-[#10B981]",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile bottom section: auth buttons OR user actions */}
            <div className="pt-3 flex flex-col gap-2.5">
              {isLoggedIn ? (
                <>
                  {/* Logged-in user info row */}
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-lg">
                    <Avatar user={user} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-[#6B7280] truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>

                  <NavLink
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className={[
                      "w-full flex items-center justify-center gap-2",
                      "px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200",
                      "border-[#0F172A] text-[#0F172A] bg-transparent hover:bg-[#0F172A] hover:text-white",
                    ].join(" ")}
                  >
                    <MdDashboard className="w-4 h-4" />
                    Dashboard
                  </NavLink>

                  <button
                    onClick={() => {
                      onLogout();
                      handleLinkClick();
                    }}
                    className={[
                      "w-full flex items-center justify-center gap-2",
                      "px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      "bg-red-500 text-white hover:bg-red-600",
                    ].join(" ")}
                  >
                    <MdLogout className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    onClick={handleLinkClick}
                    className={[
                      "w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200",
                      "border-[#0F172A] text-[#0F172A] bg-transparent hover:bg-[#0F172A] hover:text-white",
                    ].join(" ")}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={handleLinkClick}
                    className={[
                      "w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      "bg-[#10B981] text-white hover:bg-[#0d9f72] hover:shadow-md hover:shadow-emerald-200",
                    ].join(" ")}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default PublicNav;
