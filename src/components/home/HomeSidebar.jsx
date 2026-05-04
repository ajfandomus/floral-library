import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sanityClient } from "../../lib/sanity";
import { categoriesQuery } from "../../lib/queries";

export default function HomeSidebar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await sanityClient.fetch(categoriesQuery);
        setCategories(data || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <aside className="home__sidebar">
      {/* Mobile toggle header */}
      <button
        className="home__sidebar-toggle"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-expanded={mobileOpen}
      >
        <span>Collections</span>
        <svg
          className={`home__sidebar-chevron ${mobileOpen ? "home__sidebar-chevron--open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Sidebar inner — always visible on desktop, collapsible on mobile */}
      <div className={`home__sidebar-inner ${mobileOpen ? "home__sidebar-inner--open" : ""}`}>
        {/* Desktop title */}
        <p className="home__sidebar-title">Collections</p>
        <div className="home__sidebar-line" />

        <ul className="home__menu">
          <li className="home__menu-item">
            <Link to="/all-plant-collections" className="home__menu-link">
              <span>All Plant Collections</span>
            </Link>
          </li>

          {loading ? (
            <li className="home__menu-item">
              <p className="home__sidebar-status">Loading categories...</p>
            </li>
          ) : categories.length === 0 ? (
            <li className="home__menu-item">
              <p className="home__sidebar-status">No categories found.</p>
            </li>
          ) : (
            categories.map((category) => (
              <li key={category._id} className="home__menu-item">
                <Link
                  to={`/collections/${category.slug}`}
                  className="home__menu-link"
                >
                  <span>{category.title}</span>
                  <span className="home__chevron">⌄</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}