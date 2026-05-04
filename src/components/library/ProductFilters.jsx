import { useState } from "react";
import "./ProductFilters.css";

function getUniqueValues(products, fieldName) {
  return [
    ...new Set(
      products.flatMap((product) => product[fieldName] || [])
    ),
  ].sort();
}

function toggleValue(value, selectedValues, setSelectedValues) {
  if (selectedValues.includes(value)) {
    setSelectedValues(selectedValues.filter((item) => item !== value));
  } else {
    setSelectedValues([...selectedValues, value]);
  }
}

export default function ProductFilters({
  products,
  selectedFeatures,
  setSelectedFeatures,
  selectedColors,
  setSelectedColors,
  selectedBloomTimes,
  setSelectedBloomTimes,
  onClear,
  onPrint,
}) {
  const [open, setOpen] = useState(false);

  const features = getUniqueValues(products, "features");
  const colors = getUniqueValues(products, "colors");
  const bloomTimes = getUniqueValues(products, "bloomTime");

  const hasActiveFilters =
    selectedFeatures.length > 0 ||
    selectedColors.length > 0 ||
    selectedBloomTimes.length > 0;

  const totalActive =
    selectedFeatures.length + selectedColors.length + selectedBloomTimes.length;

  return (
    <section className="product-filters">

      {/* Toggle header */}
      <button
        type="button"
        className="product-filters__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span className="product-filters__toggle-label">
          Refine by Special Features
          {hasActiveFilters && (
            <span className="product-filters__badge">{totalActive}</span>
          )}
        </span>
        <svg
          className={`product-filters__chevron ${open ? "product-filters__chevron--open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible body */}
      <div className={`product-filters__body ${open ? "product-filters__body--open" : ""}`}>
        <div className="product-filters__body-inner">
          <div className="product-filters__layout">

            {/* Left: filters */}
            <div className="product-filters__left">

              {hasActiveFilters && (
                <div className="product-filters__clear-row">
                  <button
                    type="button"
                    className="product-filters__clear"
                    onClick={onClear}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {features.length > 0 && (
                <div className="product-filters__group">
                  <h3>Features</h3>
                  <div className="product-filters__buttons">
                    {features.map((feature) => (
                      <button
                        key={feature}
                        type="button"
                        className={
                          selectedFeatures.includes(feature)
                            ? "product-filters__button product-filters__button--active"
                            : "product-filters__button"
                        }
                        onClick={() =>
                          toggleValue(feature, selectedFeatures, setSelectedFeatures)
                        }
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div className="product-filters__group">
                  <h3>Color</h3>
                  <div className="product-filters__buttons">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={
                          selectedColors.includes(color)
                            ? "product-filters__button product-filters__button--active"
                            : "product-filters__button"
                        }
                        onClick={() =>
                          toggleValue(color, selectedColors, setSelectedColors)
                        }
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bloomTimes.length > 0 && (
                <div className="product-filters__group">
                  <h3>Bloom Time</h3>
                  <div className="product-filters__buttons">
                    {bloomTimes.map((bloom) => (
                      <button
                        key={bloom}
                        type="button"
                        className={
                          selectedBloomTimes.includes(bloom)
                            ? "product-filters__button product-filters__button--active"
                            : "product-filters__button"
                        }
                        onClick={() =>
                          toggleValue(bloom, selectedBloomTimes, setSelectedBloomTimes)
                        }
                      >
                        {bloom}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right: print */}
            <div className="product-filters__right">
              <button
                type="button"
                className="product-filters__print-btn"
                onClick={onPrint}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="15" height="15" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" />
                </svg>
                Print Planning Cards
              </button>
              <p className="product-filters__print-note">
                <strong>Please note:</strong> If you have any refine by features selected, only those varieties currently showing will be included on your print sheet.
              </p>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}