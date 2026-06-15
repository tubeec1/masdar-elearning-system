import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { MdDashboard, MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Contact", to: "/contact" },
];

// ─────────────────────────────────────────────
// ProfileDropdown — desktop only
// ─────────────────────────────────────────────
const ProfileDropdown = ({ user, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/dashboard");
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
          <img
            src={`http://localhost:5000/public/${user.profileImage}`}
            alt={user.fullName}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.fullName || "U",
              )}&background=10B981&color=fff`;
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#0F172A] truncate">
              {user?.fullName || "User"}
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
          <MdDashboard className="w-4 h-4 text-[#6B7280] group-hover:text-[#10B981] transition-colors" />
          Dashboard
        </button>

        <div className="mx-3 my-1 border-t border-gray-100" />

        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          role="menuitem"
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 group"
        >
          <MdLogout className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
          Log Out
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main PublicNav
// ─────────────────────────────────────────────
const PublicNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(user);

  // ── Single logout handler ──
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [profileOpen]);

  // Close profile dropdown on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown { animation: dropdownIn 0.18s ease-out forwards; }
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
            {/* ── Logo ── */}
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

            {/* ── Desktop Nav Links ── */}
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

            {/* ── Desktop: Auth buttons OR Profile avatar ── */}
            <div
              className="hidden md:flex items-center gap-3"
              aria-label="Account actions"
            >
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((p) => !p)}
                    className={[
                      "relative flex items-center justify-center rounded-full transition-all duration-300",
                      "hover:scale-105 hover:ring-2 hover:ring-[#10B981] hover:ring-offset-2",
                      profileOpen ? "ring-2 ring-[#10B981] ring-offset-2" : "",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2",
                    ].join(" ")}
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    aria-label="Open user menu"
                  >
                    <img
                      src={`http://localhost:5000/public/${user.profileImage}`}
                      alt={user.fullName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-lg bg-slate-100"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.fullName || "U",
                        )}&background=10B981&color=fff`;
                      }}
                    />
                    {/* Online dot */}
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                  </button>

                  {profileOpen && (
                    <ProfileDropdown
                      user={user}
                      onClose={() => setProfileOpen(false)}
                      onLogout={handleLogout}
                    />
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="px-4 py-2 text-sm font-medium rounded-lg border border-[#0F172A] text-[#0F172A] bg-transparent hover:bg-[#0F172A] hover:text-white transition-all duration-200"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-[#10B981] text-white hover:bg-[#0d9f72] hover:shadow-md hover:shadow-emerald-200 hover:-translate-y-px transition-all duration-200"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>

            {/* ── Mobile: hamburger ONLY (no avatar here) ── */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-lg text-[#0F172A] hover:bg-[#F3F4F6] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
                onClick={() => setMenuOpen((p) => !p)}
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

        {/* ── Mobile Drawer ── */}
        <div
          id="mobile-menu"
          className={[
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            menuOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
          aria-hidden={!menuOpen}
        >
          <nav
            className="px-4 pt-3 pb-5 border-t border-gray-100 bg-white space-y-1"
            aria-label="Mobile navigation"
          >
            {/* Nav links */}
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

            {/* Divider */}
            <div className="pt-2 border-t border-gray-100" />

            {/* Auth section inside drawer */}
            <div className="pt-2 flex flex-col gap-2.5">
              {isLoggedIn ? (
                <>
                  {/* Profile card */}
                  <div className="flex items-center gap-3 px-3 py-3 bg-gradient-to-r from-slate-50 to-emerald-50 rounded-xl border border-gray-100">
                    <div className="relative flex-shrink-0">
                      <img
                        src={`http://localhost:5000/public/${user.profileImage}`}
                        alt={user.fullName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md bg-slate-100"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.fullName || "U",
                          )}&background=10B981&color=fff`;
                        }}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F172A] truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-[#6B7280] truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <NavLink
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-[#0F172A] text-[#0F172A] bg-transparent hover:bg-[#0F172A] hover:text-white transition-all duration-200"
                  >
                    <MdDashboard className="w-4 h-4" />
                    Dashboard
                  </NavLink>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
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
                    className="w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg border border-[#0F172A] text-[#0F172A] bg-transparent hover:bg-[#0F172A] hover:text-white transition-all duration-200"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={handleLinkClick}
                    className="w-full text-center px-4 py-2.5 text-sm font-medium rounded-lg bg-[#10B981] text-white hover:bg-[#0d9f72] hover:shadow-md hover:shadow-emerald-200 transition-all duration-200"
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
