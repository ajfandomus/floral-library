import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeSidebar from "../components/home/HomeSidebar";
import { sanityClient, urlFor } from "../lib/sanity";
import { flowerBySlugQuery } from "../lib/queries";
import "./FlowerDetail.css";

export default function FlowerDetail() {
  const { categorySlug, flowerSlug } = useParams();

  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlower() {
      try {
        const data = await sanityClient.fetch(flowerBySlugQuery, {
          categorySlug,
          flowerSlug,
        });
        setFlower(data);
      } catch (error) {
        console.error("Error loading flower detail:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFlower();
  }, [categorySlug, flowerSlug]);

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="flower-detail-page">
        <div className="flower-detail-page__layout">
          <HomeSidebar />
          <main className="flower-detail-page__content">
            <p className="flower-detail-page__status">Loading flower...</p>
          </main>
        </div>
      </div>
    );
  }

  if (!flower) {
    return (
      <div className="flower-detail-page">
        <div className="flower-detail-page__layout">
          <HomeSidebar />
          <main className="flower-detail-page__content">
            <p className="flower-detail-page__status">Flower not found.</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flower-detail-page">
      <div className="flower-detail-page__layout">
        <HomeSidebar />

        <main className="flower-detail-page__content">
          <div className="flower-detail-page__grid">
            <section className="flower-detail-page__media">
              {flower.mainImage ? (
                <img
                  src={urlFor(flower.mainImage).width(1400).url()}
                  alt={flower.title}
                  className="flower-detail-page__image"
                />
              ) : (
                <div className="flower-detail-page__image-placeholder" />
              )}
            </section>

            <section className="flower-detail-page__panel">
              <p className="flower-detail-page__eyebrow">
                {flower.categoryTitle}
              </p>

              <h1>{flower.title}</h1>

              {flower.shortDescription && (
                <p className="flower-detail-page__short">
                  {flower.shortDescription}
                </p>
              )}

              <button
                type="button"
                className="flower-detail-page__print-btn"
                onClick={handlePrint}
              >
                Print
              </button>

              {flower.description && (
                <div className="flower-detail-page__section">
                  <h2>Description</h2>
                  <p>{flower.description}</p>
                </div>
              )}

              {flower.harvestingVaseLife && (
                <div className="flower-detail-page__section">
                  <h2>Harvesting / Vase Life</h2>
                  <p>{flower.harvestingVaseLife}</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}