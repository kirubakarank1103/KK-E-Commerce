// FilterBar Component — handles category, price, rating filters + sort

const RATING_OPTIONS = [
  { value: 0,   label: "Any" },
  { value: 3,   label: "3+" },
  { value: 4,   label: "4+" },
  { value: 4.5, label: "4.5+" },
];

const SORT_OPTIONS = [
  { value: "default",    label: "Featured" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "popular",    label: "Most Popular" },
];

export default function FilterBar({ categories, filters, onFilterChange }) {
  const { category, maxPrice, minRating, sort } = filters;

  const Chip = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      style={{
        ...styles.chip,
        ...(active ? styles.chipActive : {}),
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={styles.bar}>
      {/* Category Filter */}
      <div style={styles.group}>
        <p style={styles.groupLabel}>Category</p>
        <div style={styles.chips}>
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              active={category === c}
              onClick={() => onFilterChange("category", c)}
            />
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div style={styles.group}>
        <p style={styles.groupLabel}>
          Max Price: ₹{maxPrice.toLocaleString("en-IN")}
        </p>
        <input
          type="range"
          min={500}
          max={50000}
          step={500}
          value={maxPrice}
          onChange={(e) => onFilterChange("maxPrice", Number(e.target.value))}
          style={styles.slider}
        />
      </div>

      {/* Rating Filter */}
      <div style={styles.group}>
        <p style={styles.groupLabel}>Min Rating</p>
        <div style={styles.chips}>
          {RATING_OPTIONS.map((r) => (
            <Chip
              key={r.value}
              label={r.label}
              active={minRating === r.value}
              onClick={() => onFilterChange("minRating", r.value)}
            />
          ))}
        </div>
      </div>

      {/* Sort */}
      <div style={styles.group}>
        <p style={styles.groupLabel}>Sort By</p>
        <select
          value={sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
          style={styles.select}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    background: "#fff",
    border: "1px solid #e8e6e0",
    borderRadius: 12,
    padding: "16px 20px",
    marginBottom: 24,
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    alignItems: "flex-start",
    fontFamily: "'DM Sans', sans-serif",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  groupLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    margin: 0,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    fontSize: 12,
    fontWeight: 500,
    padding: "5px 12px",
    borderRadius: 20,
    border: "1px solid #e0ddd6",
    background: "#fff",
    color: "#666",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "'DM Sans', sans-serif",
  },
  chipActive: {
    background: "#1D9E75",
    borderColor: "#1D9E75",
    color: "#fff",
  },
  slider: {
    width: 160,
    accentColor: "#1D9E75",
    cursor: "pointer",
  },
  select: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    padding: "7px 12px",
    borderRadius: 8,
    border: "1px solid #e0ddd6",
    background: "#fff",
    color: "#1a1a1a",
    cursor: "pointer",
    outline: "none",
  },
};