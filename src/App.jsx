import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "./data/products";
import ProductCard from "./components/ProductCard";
import FilterBar from "./components/FilterBar";
import Toast, { useToast } from "./components/Toast";

// ─── Filter Logic ───────────────────────────────────────────────
function applyFilters(products, { category, maxPrice, minRating }) {
  return products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.price <= maxPrice &&
      p.rating >= minRating
  );
}

// ─── Sort Logic ─────────────────────────────────────────────────
function applySort(products, sort) {
  const list = [...products];
  switch (sort) {
    case "price-asc":  return list.sort((a, b) => a.price - b.price);
    case "price-desc": return list.sort((a, b) => b.price - a.price);
    case "rating":     return list.sort((a, b) => b.rating - a.rating);
    case "popular":    return list.sort((a, b) => b.popularity - a.popularity);
    default:           return list;
  }
}

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  const [filters, setFilters] = useState({
    category:  "All",
    maxPrice:  50000,
    minRating: 0,
    sort:      "default",
  });

  const [cartCount, setCartCount] = useState(0);
  const { toast, showToast } = useToast();

  // Derived filtered + sorted product list
  const visibleProducts = useMemo(() => {
    const filtered = applyFilters(PRODUCTS, filters);
    return applySort(filtered, filters.sort);
  }, [filters]);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1);
    showToast(`Added "${product.name}" to cart`);
  };

  return (
    <div style={styles.page}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header style={styles.header}>
        <span style={styles.logo}>The Curated Shop</span>
        <button style={styles.cartBtn} onClick={() => showToast(`${cartCount} item(s) in cart`)}>
          🛒 Cart{" "}
          <span style={styles.cartBadge}>{cartCount}</span>
        </button>
      </header>

      {/* Main Content */}
      <main style={styles.container}>
        <h1 style={styles.pageTitle}>Shop All Products</h1>
        <p style={styles.pageSub}>Handpicked essentials, delivered across India</p>

        {/* Filters */}
        <FilterBar
          categories={CATEGORIES}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Results count */}
        <p style={styles.countLabel}>
          Showing {visibleProducts.length} product
          {visibleProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product Grid */}
        {visibleProducts.length === 0 ? (
          <div style={styles.empty}>
            <span style={{ fontSize: 40 }}>🔍</span>
            <p>No products match your filters.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Toast Notification */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f7f4",
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    background: "#fff",
    borderBottom: "1px solid #e8e6e0",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 600,
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  cartBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    fontWeight: 500,
    padding: "7px 16px",
    borderRadius: 20,
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  cartBadge: {
    background: "#1D9E75",
    color: "#fff",
    borderRadius: "50%",
    width: 18,
    height: 18,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 24px",
  },
  pageTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 600,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  pageSub: {
    fontSize: 14,
    color: "#777",
    marginBottom: 28,
  },
  countLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 20,
  },
  empty: {
    textAlign: "center",
    padding: "4rem",
    color: "#999",
    fontSize: 15,
  },
};