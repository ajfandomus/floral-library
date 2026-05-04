import { Link } from "react-router-dom";

export default function HomeStorySection() {
  return (
    <section className="home-story">
      <div className="home-story__panel">
        <div className="home-story__grid">
          <div className="home-story__content">
            <h2>The Story Behind the Library</h2>

            <p className="home-story__eyebrow">
              How the Library Came to Be
            </p>

            <div className="home-story__text">
              <p>
               In the early days of building our flower operations, finding reliable and detailed information on cut flower varieties was limited and often inconsistent.
As our sourcing expanded and our standards grew, so did the need for clarity — not just in names, but in quality, performance, and usability.
              </p>

              <p>
              What began as internal documentation — identifying, testing, and understanding flowers across global suppliers — quickly evolved into a structured system of knowledge built from real experience.
              </p>
            </div>

            <div className="home-story__cta">
              <Link to="/about" className="home-story__btn">
                Read the Story
              </Link>
            </div>
          </div>

          <div className="home-story__media">
            <img
              src="https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1400&q=80"
              alt="People working in a flower garden"
            />
          </div>
        </div>
      </div>
    </section>
  );
}