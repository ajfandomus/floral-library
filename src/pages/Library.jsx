import { useState } from "react";
import flowers from "../data/flowers";
import FlowerCard from "../components/FlowerCard";
import "./Library.css";

const ALL_SEASONS = ["Spring", "Late Spring", "Summer", "Autumn"];

export default function Library() {
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("All");

  const filtered = flowers.filter((f) => {
    const matchSearch =
      f.commonName.toLowerCase().includes(search.toLowerCase()) ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.color.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchSeason = season === "All" || f.season.includes(season);
    return matchSearch && matchSeason;
  });

  return (
    <div className="library">
      <div className="library__header">
        <div className="container">
          <span className="tag">Complete Reference</span>
          <h1>The Collection</h1>
          <p>{flowers.length} flowers documented</p>
        </div>
      </div>

      <div className="library__controls container">
        <input
          type="text"
          placeholder="Search by name or colour…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="library__search"
        />
        <div className="library__filters">
          <button
            className={`filter-btn ${season === "All" ? "active" : ""}`}
            onClick={() => setSeason("All")}
          >All</button>
          {ALL_SEASONS.map((s) => (
            <button
              key={s}
              className={`filter-btn ${season === s ? "active" : ""}`}
              onClick={() => setSeason(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className="container library__grid">
        {filtered.length > 0 ? (
          <div className="card-grid">
            {filtered.map((f) => <FlowerCard key={f.id} flower={f} />)}
          </div>
        ) : (
          <p className="library__empty">No flowers found.</p>
        )}
      </div>
    </div>
  );
}
