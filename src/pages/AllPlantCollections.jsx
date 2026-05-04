import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HomeSidebar from "../components/home/HomeSidebar";
import ProductFilters from "../components/library/ProductFilters";
import { sanityClient, urlFor } from "../lib/sanity";
import { allFlowersQuery } from "../lib/queries";
import "./AllPlantCollections.css";

export default function AllPlantCollections() {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("a-z");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBloomTimes, setSelectedBloomTimes] = useState([]);

  useEffect(() => {
    async function loadFlowers() {
      try {
        const data = await sanityClient.fetch(allFlowersQuery);
        setFlowers(data || []);
      } catch (error) {
        console.error("Error loading all flowers:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFlowers();
  }, []);

  const sortedFlowers = useMemo(() => {
    let filtered = [...flowers];

    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((flower) =>
        selectedFeatures.every((feature) => flower.features?.includes(feature))
      );
    }
    if (selectedColors.length > 0) {
      filtered = filtered.filter((flower) =>
        selectedColors.every((color) => flower.colors?.includes(color))
      );
    }
    if (selectedBloomTimes.length > 0) {
      filtered = filtered.filter((flower) =>
        selectedBloomTimes.every((bloom) => flower.bloomTime?.includes(bloom))
      );
    }

    filtered.sort((a, b) => {
      if (sortOrder === "z-a") return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [flowers, sortOrder, selectedFeatures, selectedColors, selectedBloomTimes]);

  function clearFilters() {
    setSelectedFeatures([]);
    setSelectedColors([]);
    setSelectedBloomTimes([]);
  }

  return (
    <div className="all-plants">

      {/* Print sheet - only visible on print */}
      <div className="print-sheet">
        <div className="print-sheet__header">
          <h1 className="print-sheet__title">All Plant Collections</h1>
          <p className="print-sheet__subtitle">Floral Library — Planning Cards</p>
        </div>
        <div className="print-sheet__grid">
          {sortedFlowers.map((flower) => (
            <div key={flower._id} className="print-card">
              <div className="print-card__image-wrap">
                {flower.mainImage ? (
                  <img
                    src={urlFor(flower.mainImage).width(600).height(600).fit("crop").url()}
                    alt={flower.title}
                    className="print-card__image"
                  />
                ) : (
                  <div className="print-card__image-placeholder" />
                )}
              </div>
              <p className="print-card__source">floretflowers.com</p>
              <p className="print-card__name">{flower.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Normal screen layout */}
      <div className="all-plants__layout no-print">
        <HomeSidebar />

        <main className="all-plants__content">
          <nav className="all-plants__breadcrumb">
            <Link to="/">Home</Link>
            <span>|</span>
            <strong>All Plant Collections</strong>
          </nav>

          <section className="all-plants__hero">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80"
              alt="All plant collections"
            />
            <div className="all-plants__hero-overlay">
              <h1>All Plant Collections</h1>
            </div>
          </section>

          <section className="all-plants__intro">
            <h2>Explore All Flower Varieties</h2>
            <p>
              Browse every visible flower variety in the library. Open each
              profile to view descriptions, harvesting notes, vase life details,
              and planning information.
            </p>
          </section>

          <section className="all-plants__toolbar">
            <div className="all-plants__toolbar-left">
              <p>{sortedFlowers.length} varieties</p>
            </div>
            <div className="all-plants__toolbar-right">
              <label htmlFor="allPlantsSort" className="all-plants__sort-label">
                Sort by
              </label>
              <select
                id="allPlantsSort"
                className="all-plants__sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="a-z">A–Z</option>
                <option value="z-a">Z–A</option>
              </select>
            </div>
          </section>

          {!loading && (
            <ProductFilters
              products={flowers}
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedBloomTimes={selectedBloomTimes}
              setSelectedBloomTimes={setSelectedBloomTimes}
              onClear={clearFilters}
              onPrint={() => window.print()}
            />
          )}

          {loading ? (
            <p className="all-plants__status">Loading flowers...</p>
          ) : sortedFlowers.length === 0 ? (
            <p className="all-plants__status">
              No flowers found for the selected filters.
            </p>
          ) : (
            <section className="all-plants__grid">
              {sortedFlowers.map((flower) => (
                <article key={flower._id} className="all-plants-card">
                  <Link
                    to={`/collections/${flower.categorySlug}/${flower.slug}`}
                    className="all-plants-card__link"
                  >
                    <div className="all-plants-card__image-wrap">
                      {flower.mainImage ? (
                        <img
                          src={urlFor(flower.mainImage).width(900).url()}
                          alt={flower.title}
                          className="all-plants-card__image"
                        />
                      ) : (
                        <div className="all-plants-card__image all-plants-card__image--placeholder" />
                      )}
                    </div>
                    <h3>{flower.title}</h3>
                  </Link>
                </article>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}