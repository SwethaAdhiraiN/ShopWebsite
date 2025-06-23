import React from 'react';
import { Link } from 'react-router-dom';

// Demo featured and recent products — stubbed for this UI
const featured = [
  { id: 1, name: 'Product A', price: 29.99 },
  { id: 3, name: 'Product C', price: 14.95 },
  { id: 4, name: 'Product D', price: 49.99 },
];
const recent = [
  { id: 2, name: 'Product B', price: 39.99 },
];

// Main categories or promo banners — sample static
const categories = [
  { icon: "👜", label: "Bags", color: "#D4AF37" },
  { icon: "👟", label: "Shoes", color: "#8B5CF6" },
  { icon: "🕶️", label: "Accessories", color: "#1C1C1C" },
  { icon: "🧴", label: "Beauty", color: "#E87A41" },
];

// PUBLIC_INTERFACE
function HomePage() {
  /**
   * Revamped HomePage: only shows a curated list of featured/recent products, NOT the full product catalog.
   * Adds promotional/carousel area and engaging category highlights.
   * Uses modern e-commerce design and aligns with palette.
   * No redirect for logged-in users: HomePage now always visible for all.
   */
  return (
    <div className="container" style={{ paddingBottom: 56 }}>
      {/* HERO BANNER */}
      <section className="hero" style={{
        marginTop: 16, marginBottom: 0,
        padding: "5rem 0 3.5rem 0",
        background: "linear-gradient(100deg, #fff1 15%, var(--accent-color) 88%, #fff0 100%)",
        borderRadius: 18,
        boxShadow: "0 6px 40px 0 #8b5cf641,0 2px 14px 0 #d4af3741"
      }}>
        <div className="subtitle" style={{
          fontWeight: 700,
          letterSpacing: ".13em",
          textTransform: "uppercase",
          color: "var(--secondary-color)"
        }}>
          Summer Sale • New Arrivals
        </div>
        <h1 className="title" style={{ marginBottom: 10, fontSize: "2.9rem" }}>
          Discover What’s New <span style={{color:"var(--base-light)"}}>This Season</span>
        </h1>
        <div className="description" style={{ marginBottom: 18 }}>
          Shop handpicked products, check out curated categories, and don’t miss our exclusive deals.
        </div>
        <Link
          className="btn btn-large"
          style={{
            width: 185,
            alignSelf: 'center',
            fontWeight: 600,
            fontSize: '1.16rem',
            borderRadius: 7,
            boxShadow: '0 3px 18px #8b5cf62a'
          }}
          to="/products"
        >
          Shop All Products
        </Link>
      </section>

      {/* CATEGORY HIGHLIGHTS */}
      <section style={{
        marginTop: -30,
        marginBottom: 35,
        zIndex: 5,
        position: "relative"
      }}>
        <div style={{
          display: 'flex',
          flexDirection: "row",
          gap: 24,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: "center",
        }}>
          {categories.map(cat => (
            <Link
              key={cat.label}
              to={`/products?category=${encodeURIComponent(cat.label)}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 96,
                minHeight: 76,
                borderRadius: 14,
                background: "#fff",
                color: "var(--primary-color)",
                boxShadow: "0 2px 18px #d4af3724",
                border: "1.7px solid var(--border-color)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.13rem",
                margin: "7px 0",
                transition: "box-shadow 0.17s, border 0.17s"
              }}
              tabIndex={0}
              aria-label={`Shop ${cat.label}`}
              onMouseOver={e => { e.currentTarget.style.boxShadow = "0 6px 24px #8b5cf634"; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = "0 2px 18px #d4af3724"; }}
            >
              <span style={{
                fontSize: "2rem",
                marginBottom: 4,
                color: cat.color,
                lineHeight: 1
              }}>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
        <div className="description" style={{
          marginTop: 17,
          textAlign: "center",
          color: "var(--text-secondary)"
        }}>
          Shop by category – Find your style now!
        </div>
      </section>

      {/* PROMOTIONAL BANNERS */}
      <section style={{
        marginBottom: 30,
        width: "100%",
        textAlign: "center",
      }}>
        <div style={{
          background: "linear-gradient(85deg, var(--base-light) 0%, var(--secondary-color) 95%)",
          color: "#fff",
          borderRadius: 14,
          padding: "1.2rem 2rem",
          fontWeight: 700,
          fontSize: "1.13rem",
          letterSpacing: 0.01,
          boxShadow: "0 2px 18px #8b5cf633",
          display: "inline-block",
          margin: "0 auto"
        }}>
          <span style={{fontSize:20}}>✨</span> Use code <span style={{
            background:"#fff8",
            color:"var(--base-light)",
            padding:"2px 8px",
            borderRadius:8,
            margin:"0 6px",
            letterSpacing:0.04
          }}>WELCOME10</span> for 10% off! <span style={{fontSize:20}}>🛒</span>
        </div>
      </section>

      {/* FEATURED + RECENT PRODUCTS */}
      <section>
        <div style={{
          fontWeight: 600,
          fontSize: '1.27rem',
          marginBottom: 15,
          color: 'var(--base-light)',
          letterSpacing: ".01em"
        }}>
          Featured For You
        </div>
        <div
          className="featuredCards"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 22,
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          {[...featured, ...recent].map((prod) => (
            <div
              key={prod.id}
              className="card"
              style={{
                background: "var(--surface-color)",
                borderRadius: 14,
                boxShadow: "0 8px 34px 0 #8b5cf641, 0 2px 14px 0 #d4af3735",
                border: "2px solid var(--border-color)",
                padding: "1.25rem",
                minWidth: 170,
                maxWidth: 212,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div style={{
                width: "100%",
                height: 54,
                background: "var(--card-bg-muted)",
                borderRadius: 7,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ fontSize: 27, color: "var(--base-light)" }}>🛍️</span>
              </div>
              <div style={{ fontWeight: 500, marginBottom: 3 }}>{prod.name}</div>
              <div style={{
                color: 'var(--base-light)',
                fontWeight: 500,
                fontSize: '1rem',
                marginBottom: 5
              }}>${prod.price.toFixed(2)}</div>
              <Link
                to={`/products/${prod.id}`}
                style={{
                  color: '#fff',
                  background: 'var(--accent-color)',
                  borderRadius: 5,
                  fontWeight: 600,
                  padding: '7px 14px',
                  fontSize: '.97rem',
                  textDecoration: 'none',
                  marginTop: 5,
                  display: 'inline-block',
                  boxShadow: "0 1.5px 7px #8b5cf638"
                }}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* Mobile tweak spacing */}
      <style>{`
        @media (max-width: 600px) {
          .hero {
            padding: 2.2rem 0 1.4rem 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
