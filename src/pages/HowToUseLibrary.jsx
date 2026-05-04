import { Link } from "react-router-dom";
import HomeSidebar from "../components/home/HomeSidebar";
import "./HowToUseLibrary.css";

const FAQS = [
  {
    q: "How do I browse flowers?",
    a: "Use the collections menu to open a flower category. Each category page shows its varieties with images, names, and sorting options.",
  },
  {
    q: "How do I see full product information?",
    a: "Click any flower card to open its detail page. There you can read the description, harvesting notes, and vase life information.",
  },
  {
    q: "Can I print flower details?",
    a: "Yes. Each flower detail page includes a print option so you can save or print planning information.",
  },
  {
    q: "Why are some flowers missing images?",
    a: "Some entries may be added before final images are uploaded. Images can be added later from the admin dashboard.",
  },
];

export default function HowToUseLibrary() {
  return (
    <div className="how-library">
      <div className="how-library__layout">
        <HomeSidebar />

        <main className="how-library__content">
          <section className="how-library__hero">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80"
              alt="Flower garden notes"
            />
            <div className="how-library__hero-overlay">
              <h1>How to Use the Library</h1>
            </div>
          </section>

          <section className="how-library__intro">
            <h2>Explore the Floral Library</h2>
            <p className="how-library__subtitle">
              Get the most out of your flower discovery experience
            </p>
            <div className="how-library__divider" />
            <p>
              The Floral Library is designed to help you explore flower
              varieties by collection, understand each variety’s details, and
              use the information for planning, sourcing, and inspiration.
            </p>
            <p>
              Browse collections, open individual flower profiles, sort
              varieties, and print useful notes from each detail page.
            </p>
          </section>

          <section className="how-library__guide">
            <div className="how-library__guide-image">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&q=80"
                alt="Browsing flower garden"
              />
            </div>
            <div className="how-library__guide-text">
              <h2>Tour the Library</h2>
              <p>
                Start with the collections sidebar. Choose a category such as
                chrysanthemums, tulips, peonies, or any other collection
                available in the library.
              </p>
              <p>
                Each category page gives you a focused view of that flower
                group, with simple sorting so you can browse from A–Z or Z–A.
              </p>
              <Link to="/library" className="how-library__button">
                Explore Library
              </Link>
            </div>
          </section>

          <section className="how-library__guide how-library__guide--reverse">
            <div className="how-library__guide-text">
              <h2>Print Product Information</h2>
              <p>
                Each flower detail page includes useful information like
                description, growing notes, harvesting guidance, and vase life.
              </p>
              <p>
                Use the print button on the product page to create a simple
                planning sheet for your own reference.
              </p>
            </div>
            <div className="how-library__guide-image">
              <img
                src="https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad4?w=1200&q=80"
                alt="Printed flower notes"
              />
            </div>
          </section>

          <section className="how-library__guide">
            <div className="how-library__guide-image">
              <img
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80"
                alt="Flower variety cards"
              />
            </div>
            <div className="how-library__guide-text">
              <h2>Find New Varieties</h2>
              <p>
                Use the library to discover varieties you may not know yet.
                Compare names, colors, shapes, and descriptions across
                different collections.
              </p>
              <p>
                This is especially helpful for florists, growers, designers,
                and anyone building a flower reference list.
              </p>
            </div>
          </section>

          <section className="how-library__faq">
            <h2>Frequently Asked Questions</h2>

            <div className="how-library__faq-list">
              {FAQS.map((item) => (
                <article key={item.q} className="how-library__faq-item">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}