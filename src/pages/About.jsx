import "./About.css";

export default function About() {
  return (
    <div className="about">
      <div className="about__header">
        <div className="container">
          <span className="tag">Our Story</span>
          <h1 className="about__header-title">About the Library</h1>
        </div>
      </div>

      <div className="about__body container">
        <div className="about__text">
          <h2>A reference built with love for flowers</h2>
          <p>
           The Domus Flowers Library is a curated reference designed for florists, designers, and wholesale buyers created to go beyond names and visuals into true product understanding.
          </p>
          <p>
           Built from years of sourcing, handling, and supplying premium flowers across global markets, this library reflects real-world floral knowledge shaped by daily operations, logistics, and design needs.
          </p>
          <p>
           Each entry captures essential details including variety characteristics, origin, seasonal availability, and practical usage insights — presented with the same level of precision and care that defines our wholesale standards.
          </p>
        </div>
        <div className="about__image">
          <img
            src="https://plus.unsplash.com/premium_photo-1723579344746-706671ff4840?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zmxvd2VyJTIwbWFya2V0fGVufDB8fDB8fHww"
            alt="Botanical workspace"
          />
        </div>
      </div>

      <div className="about__values container">
        <div className="about__value">
          <span className="about__value-icon">✦</span>
          <h3>Botanical Accuracy</h3>
          <p>Every entry is researched from primary horticultural sources.</p>
        </div>
        <div className="about__value">
          <span className="about__value-icon">✦</span>
          <h3>Seasonal Wisdom</h3>
          <p>Bloom windows and care guides are tailored to real growing conditions.</p>
        </div>
        <div className="about__value">
          <span className="about__value-icon">✦</span>
          <h3>Designed to Last</h3>
          <p>A static site — fast, portable, and built to endure.</p>
        </div>
      </div>
    </div>
  );
}
