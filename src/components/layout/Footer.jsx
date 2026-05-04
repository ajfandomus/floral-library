import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
             Domus Flowers
            </Link>
            <p className="site-footer__brand-text">
              A thoughtful space for flower lovers to explore varieties,
              discover inspiration, and learn through beautiful reference
              collections.
            </p>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">Explore</h3>
            <div className="site-footer__line" />
            <nav className="site-footer__links">
              <Link to="/library">Library</Link>
              <Link to="/about">About</Link>
              <Link to="/">Home</Link>
            </nav>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">Support</h3>
            <div className="site-footer__line" />
            <nav className="site-footer__links">
              <a href="#">Contact</a>
              <a href="#">FAQ</a>
              <a href="#">Privacy Policy</a>
            </nav>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">Join the List</h3>
            <div className="site-footer__line" />
            <p className="site-footer__newsletter-text">
              Stay in the loop for new collections and updates.
            </p>

            <form className="site-footer__form">
              <input
                type="text"
                placeholder="First name"
                className="site-footer__input"
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="site-footer__input"
              />
              <button type="submit" className="site-footer__button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© Floral Library 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}