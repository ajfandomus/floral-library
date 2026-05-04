import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sanityClient, urlFor } from "../../lib/sanity";
import { featuredCategoriesQuery } from "../../lib/queries";

export default function HomeCollectionsGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedCategories() {
      try {
        const data = await sanityClient.fetch(featuredCategoriesQuery);
        setCategories(data || []);
      } catch (error) {
        console.error("Error loading featured categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedCategories();
  }, []);

  if (loading) {
    return (
      <section className="home__featured">
        <div className="home__featured-grid">
          <p className="home__sidebar-status">Loading featured collections...</p>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section className="home__featured">
      <div className="home__featured-grid">
        {categories.map((item) => (
          <article key={item._id} className="home__featured-card">
            <Link
              to={`/collections/${item.slug}`}
              className="home__featured-card-link"
            >
              <div className="home__featured-image-wrap">
                {item.heroImage ? (
                  <img
                    src={urlFor(item.heroImage).width(1200).height(1200).url()}
                    alt={item.title}
                    className="home__featured-image"
                  />
                ) : (
                  <div className="home__featured-image home__featured-image--placeholder" />
                )}
              </div>

              <div className="home__featured-caption">
                <h3>{item.title}</h3>
                <span className="home__featured-link">Explore</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}