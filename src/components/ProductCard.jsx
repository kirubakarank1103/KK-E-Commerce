import { useState } from "react";

// Badge colors mapping
const BADGE_STYLES = {
  bestseller: { background: "#E1F5EE", color: "#0F6E56" },
  hot:        { background: "#FAECE7", color: "#993C1D" },
  new:        { background: "#E6F1FB", color: "#185FA5" },
};

// Format price in Indian Rupees
const formatINR = (amount) =>
  "₹" + amount.toLocaleString("en-IN");

// Star rating renderer
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: "#EF9F27", fontSize: 12 }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

export default function ProductCard({ product, onAddToCart }) {
  const [wished, setWished]   = useState(false);
  const [added, setAdded]     = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    if (added) return;
    setAdded(true);
    onAddToCart(product);
    setTimeout(() => setAdded(false), 1500);
  };

  const badgeStyle = BADGE_STYLES[product.badge] || null;

  return (
    <div style={styles.card}>
      {/* Image Section */}
      <div style={styles.imgWrap}>
        {badgeStyle && (
          <span style={{ ...styles.badge, ...badgeStyle }}>
            {product.badge}
          </span>
        )}

        <button
          onClick={() => setWished(!wished)}
          style={styles.wishBtn}
          aria-label="Wishlist"
        >
          {wished ? "❤️" : "🤍"}
        </button>

        {imgError ? (
          <div style={styles.imgFallback}>🛍️</div>
        ) : (
          <img
            src={product.img}
            alt={product.name}
            style={styles.img}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </div>

      {/* Info Section */}
      <div style={styles.body}>
        <p style={styles.category}>{product.category}</p>
        <h3 style={styles.name}>{product.name}</h3>

        <div style={styles.meta}>
          <span style={styles.price}>{formatINR(product.price)}</span>
          <div style={styles.ratingRow}>
            <StarRating rating={product.rating} />
            <span style={styles.ratingText}>
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          style={added ? { ...styles.addBtn, ...styles.addBtnAdded } : styles.addBtn}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #e8e6e0",
    borderRadius: 14,
    overflow: "hidden",
    transition: "all 0.2s",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  imgWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    background: "#f0ede6",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imgFallback: {
    fontSize: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 10,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 10,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    zIndex: 1,
  },
  wishBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  body: {
    padding: "14px 16px 16px",
  },
  category: {
    fontSize: 10,
    fontWeight: 600,
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    margin: "0 0 4px",
  },
  name: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 15,
    fontWeight: 400,
    color: "#1a1a1a",
    margin: "0 0 8px",
    lineHeight: 1.35,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 600,
    color: "#1a1a1a",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: "#999",
  },
  addBtn: {
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    padding: 9,
    borderRadius: 8,
    border: "1px solid #e0ddd6",
    background: "#fff",
    color: "#1a1a1a",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  addBtnAdded: {
    background: "#1D9E75",
    borderColor: "#1D9E75",
    color: "#fff",
  },
};