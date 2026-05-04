import { Link } from "react-router-dom";

export default function HomeIntro() {
  return (
    <section className="home__intro">
      <div className="home__intro-inner">
        <h2>Get Lost in the World of Flowers</h2>

        <p className="home__intro-subtitle">
          Discover New Treasures for Your Garden
        </p>

        <div className="home__divider" />

        <div className="home__intro-text">
          <p>
           Over the years, we have sourced and handled thousands of premium flower varieties from leading farms across the world — from signature roses and rare stems to essential fillers and seasonal specialties.
This library is a reflection of that journey.
          </p>

          <p>
            What started as a daily operational need — identifying, selecting, and delivering the finest flowers — has grown into a curated visual and knowledge archive designed to support florists, designers, and floral businesses.
          </p>

          <p>
This digital library brings together detailed references of our wholesale collection, helping you explore varieties, understand characteristics, and make confident buying decisions with clarity and precision.
          </p>
        </div>

        <div className="home__cta">
        <Link to="/how-to-use-library" className="home__intro-button">
  How to Use the Library
</Link>
        </div>
      </div>
    </section>
  );
}