import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Shop", to: "https://domusflowers.com/category/Flowers", external: true },
  { label: "Library", to: "/", external: false },
  { label: "About", to: "/about", external: false },
  { label: "Workshops", to: "/workshops", external: false },
  { label: "Resources", to: "/resources", external: false },
  { label: "Blogs", to: "https://domusflowers.com/blogs", external: true },
  { label: "Books", to: "/books", external: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (navbarRef.current) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          navbarRef.current.offsetHeight + "px"
        );
      }
    });
    if (navbarRef.current) {
      observer.observe(navbarRef.current);
      document.documentElement.style.setProperty(
        "--navbar-height",
        navbarRef.current.offsetHeight + "px"
      );
    }
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <header ref={navbarRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

      {/* ── Top utility bar ── */}
      <div className="navbar__topbar">
        <div className="container navbar__topbar-inner">
          <a href="/newsletter" className="navbar__topbar-newsletter">Newsletter</a>
          <div className="navbar__topbar-socials">
            <a href="https://www.facebook.com/domusflower.ae/#" aria-label="Facebook" className="navbar__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.9V11H8v3h2.6v8h2.9z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/domusflowers/" aria-label="Instagram" className="navbar__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="17.4" cy="6.6" r="1"></circle>
              </svg>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=%2B971559428239&text&type=phone_number&app_absent=0" aria-label="whatsapp" className="navbar__social-link">
             <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.17 1.534 5.943L.057 23.571a.75.75 0 0 0 .921.921l5.628-1.477A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 0 1-4.964-1.362l-.355-.214-3.684.967.983-3.595-.233-.37A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
</svg>
            </a>
         <a href="linkedin.com/company/domus-flowers?originalSubdomain=ae" aria-label="LinkedIn" className="navbar__social-link">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
</a>
          </div>
        </div>
      </div>

      {/* ── Logo + hamburger row ── */}
      <div className="navbar__main-row">
        <Link to="/" className="navbar__logo" onClick={close}>
          <img
            src="https://domusflowers.com/assets/images/Domus-logo-without-flowers.png"
            alt="Domus Flowers"
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__nav">
          <span className="navbar__bullet" aria-hidden="true">•</span>
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a key={item.label} href={item.to} className="navbar__link">
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  "navbar__link" + (isActive ? " navbar__link--active" : "")
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <span className="navbar__bullet" aria-hidden="true">•</span>
        </nav>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      <div
        className={`navbar__overlay ${mobileOpen ? "navbar__overlay--visible" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <div className={`navbar__drawer ${mobileOpen ? "navbar__drawer--open" : ""}`} role="dialog" aria-modal="true">
        {/* Drawer header */}
        <div className="navbar__drawer-header">
          <Link to="/" onClick={close}>
            <img
              src="https://domusflowers.com/assets/images/Domus-logo-without-flowers.png"
              alt="Domus Flowers"
              className="navbar__drawer-logo"
            />
          </Link>
          <button
            className="navbar__drawer-close"
            onClick={close}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="navbar__drawer-nav">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.to}
                className="navbar__drawer-link"
                onClick={close}
              >
                {item.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="14" height="14" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  "navbar__drawer-link" + (isActive ? " navbar__drawer-link--active" : "")
                }
                onClick={close}
              >
                {item.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="14" height="14" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </NavLink>
            )
          )}
        </nav>

        {/* Drawer socials */}
        <div className="navbar__drawer-socials">
          <a href="#" aria-label="Facebook" className="navbar__social-link navbar__social-link--dark">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.9V11H8v3h2.6v8h2.9z" /></svg>
          </a>
          <a href="#" aria-label="Instagram" className="navbar__social-link navbar__social-link--dark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.6" r="1"></circle></svg>
          </a>
          <a href="#" aria-label="Pinterest" className="navbar__social-link navbar__social-link--dark">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-3.6 19.3c0-.8 0-2 .3-2.9l1.4-5.8s-.3-.7-.3-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1.1 4-.3 1.2.6 2.1 1.8 2.1 2.2 0 3.6-2.8 3.6-6 0-2.5-1.7-4.4-4.9-4.4A5.5 5.5 0 0 0 7.2 11c0 1 .3 1.7.8 2.3.2.2.2.3.1.6l-.3 1.1c0 .3-.3.4-.6.3-1.7-.7-2.8-2.7-2.8-4.8 0-3.2 3-7 8.1-7 4.1 0 6.8 3 6.8 6.3 0 4.3-2.4 7.6-5.9 7.6-1.2 0-2.2-.6-2.6-1.3l-.7 2.5c-.2.9-.7 1.9-1.1 2.7.8.2 1.6.3 2.5.3A10 10 0 0 0 12 2z" /></svg>
          </a>
          <a href="#" aria-label="YouTube" className="navbar__social-link navbar__social-link--dark">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" /></svg>
          </a>
        </div>
      </div>

    </header>
  );
}