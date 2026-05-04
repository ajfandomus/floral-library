import { Link } from "react-router-dom";
import "./FlowerCard.css";

export default function FlowerCard({ flower }) {
  return (
    <Link to={`/flower/${flower.id}`} className="flower-card">
      <div className="flower-card__image">
        <img src={flower.image} alt={flower.commonName} />
        <div className="flower-card__season">
          {flower.season.join(" · ")}
        </div>
      </div>
      <div className="flower-card__body">
        <p className="flower-card__family">{flower.family}</p>
        <h3 className="flower-card__name">{flower.commonName}</h3>
        <p className="flower-card__latin"><em>{flower.name}</em></p>
        <p className="flower-card__meaning">{flower.meaning}</p>
        <div className="flower-card__tags">
          {flower.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </Link>
  );
}
