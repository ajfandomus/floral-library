import { Link } from "react-router-dom";

export default function HomeRespectSection() {
  return (
    <section className="home-respect">
      <div className="home-respect__topline" />

      <div className="home-respect__inner">
        <h2>Please Respect Our Work</h2>

        <p>
          We have poured so much time, energy, and years of collective effort
          into the Floral Library and it is our gift to the world. While we
          have made this information available to use for free, all of the
          words and images contained within the library are protected under
          copyright and it is illegal to duplicate or plagiarize this
          information.
        </p>
      </div>

      <div className="home-respect__bar">
        <span>Have a question? Be sure to visit our</span>
        <Link to="/library" className="home-respect__bar-link">
          How to Use the Library Page
        </Link>
      </div>
    </section>
  );
}