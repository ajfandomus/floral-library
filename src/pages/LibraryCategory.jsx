import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import HomeSidebar from "../components/home/HomeSidebar";
import ProductFilters from "../components/library/ProductFilters";
import { sanityClient, urlFor } from "../lib/sanity";
import {
  categoryBySlugQuery,
  flowersByCategorySlugQuery,
} from "../lib/queries";
import "./LibraryCategory.css";

export default function LibraryCategory() {
  const { categorySlug } = useParams();

  const [category, setCategory] = useState(null);
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("a-z");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBloomTimes, setSelectedBloomTimes] = useState([]);

  useEffect(() => {
    async function loadCategoryPage() {
      try {
        const [categoryData, flowerData] = await Promise.all([
          sanityClient.fetch(categoryBySlugQuery, { slug: categorySlug }),
          sanityClient.fetch(flowersByCategorySlugQuery, { slug: categorySlug }),
        ]);
        setCategory(categoryData);
        setFlowers(flowerData || []);
        clearFilters();
      } catch (error) {
        console.error("Error loading category page:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryPage();
  }, [categorySlug]);

const sortedFlowers = useMemo(() => {
  let filtered = [...flowers];

  if (selectedFeatures.length > 0) {
    filtered = filtered.filter((flower) =>
      selectedFeatures.some((feature) => flower.features?.includes(feature))
    );
  }

  if (selectedColors.length > 0) {
    filtered = filtered.filter((flower) =>
      selectedColors.some((color) => flower.colors?.includes(color))
    );
  }

  if (selectedBloomTimes.length > 0) {
    filtered = filtered.filter((flower) =>
      selectedBloomTimes.some((bloom) => flower.bloomTime?.includes(bloom))
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

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="library-page">
        <div className="library-page__layout">
          <HomeSidebar />
          <main className="library-page__content">
            <p className="library-page__status">Loading category...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="library-page">
        <div className="library-page__layout">
          <HomeSidebar />
          <main className="library-page__content">
            <p className="library-page__status">Category not found.</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="library-page">

      {/* Print sheet - hidden on screen, visible on print */}
      <div className="print-sheet">
        <div className="print-sheet__header">
          <h1 className="print-sheet__title">{category.title}</h1>
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
              <p className="print-card__source">Domusflowers.com</p>
              <p className="print-card__name">{flower.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Normal screen layout */}
      <div className="library-page__layout no-print">
        <HomeSidebar />

        <main className="library-page__content">
          <section className="library-page__hero">
            {category.heroImage ? (
              <img
                src={urlFor(category.heroImage).width(1600).url()}
                alt={category.title}
                className="library-page__hero-image"
              />
            ) : (
              <div className="library-page__hero-placeholder" />
            )}
            <div className="library-page__hero-overlay">
              <h1>{category.title}</h1>
            </div>
          </section>

          <section className="library-page__intro">
            <div className="library-page__intro-inner">
              <h2>{category.title}</h2>
              <p className="library-page__intro-subtitle">
                Explore carefully curated varieties from this collection
              </p>
              <div className="library-page__divider" />
              <p className="library-page__intro-text">
                {category.introText ||
                  "Discover beautiful varieties in this collection, selected for their unique form, color, and character in both the garden and the vase."}
              </p>
            </div>
          </section>

          <section className="library-page__toolbar">
            <div className="library-page__toolbar-left">
              <p>{sortedFlowers.length} varieties</p>
            </div>
            <div className="library-page__toolbar-right">
              <label htmlFor="sort" className="library-page__sort-label">Sort by</label>
              <select
                id="sort"
                className="library-page__sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </section>

          <ProductFilters
            products={flowers}
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedBloomTimes={selectedBloomTimes}
            setSelectedBloomTimes={setSelectedBloomTimes}
            onClear={clearFilters}
            onPrint={handlePrint}
          />

          <section className="library-page__grid">
            {sortedFlowers.length === 0 ? (
              <p className="library-page__status">
                No flowers found for the selected filters.
              </p>
            ) : (
              sortedFlowers.map((flower) => (
                <article key={flower._id} className="library-card">
                  <Link
                    to={`/collections/${flower.categorySlug}/${flower.slug}`}
                    className="library-card__link"
                  >
                    <div className="library-card__image-wrap">
                      {flower.mainImage ? (
                        <img
                          src={urlFor(flower.mainImage).width(900).url()}
                          alt={flower.title}
                          className="library-card__image"
                        />
                      ) : (
                        <div className="library-card__image-placeholder" />
                      )}
                    </div>
                    <div className="library-card__content">
                      <h3>{flower.title}</h3>
                      {flower.shortDescription && (
                        <p>{flower.shortDescription}</p>
                      )}
                    </div>
                  </Link>
                </article>
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  );
}