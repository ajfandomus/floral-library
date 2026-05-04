const plantCollections = [
  {
    title: "Seeds A-Z",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80",
  },
  {
    title: "Floret Originals",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1200&q=80",
  },
  {
    title: "Dahlias",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1200&q=80",
  },
  {
    title: "Zinnias",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80",
  },
  {
    title: "Foliage & Fillers",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1200&q=80",
  },
  {
    title: "Celosia",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
  },
  {
    title: "Heat-loving",
    image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=1200&q=80",
  },
  {
    title: "Edibles",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1200&q=80",
  },
  {
    title: "Chrysanthemums",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
  },
];

export default function HomePlantCollections() {
  return (
    <section className="home-plant-section">
      <div className="home-plant-section__topline" />

      <div className="home-plant-section__heading">
        <h2>Explore Plant Collections</h2>
        <p>Deep dive into these plant collections to find new favorites</p>
        <div className="home-plant-section__divider" />
      </div>

      <div className="home-plant-section__grid">
        {plantCollections.map((item) => (
          <article key={item.title} className="home-plant-card">
            <div className="home-plant-card__image-wrap">
              <img
                src={item.image}
                alt={item.title}
                className="home-plant-card__image"
              />
            </div>

            <div className="home-plant-card__caption">
              <h3>{item.title}</h3>
              <button type="button" className="home-plant-card__link">
                Explore
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}