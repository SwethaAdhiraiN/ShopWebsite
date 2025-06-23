import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
function LoginPage() {
  /**
   * Controlled login form with validations and error display.
   * Calls AuthContext login and redirects to products when authorized.
   */
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Controlled fields
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Handle input field changes
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setSubmitError('');
  };

  // Validate fields before submitting
  const validate = () => {
    const newErr = {};
    if (!form.username.trim()) newErr.username = 'Username is required';
    if (!form.password) newErr.password = 'Password is required';
    return newErr;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSubmitError('');
      return;
    }
    setSubmitting(true);
    setErrors({});
    setSubmitError('');
    // New: use AuthContext login which updates global state and persist user
    const result = await authLogin(form.username, form.password);
    if (result && result.success) {
      // Smooth redirect to intended page or store
      const redirectTo = (location.state && location.state.from && location.state.from.pathname && !['/login','/register'].includes(location.state.from.pathname))
        ? location.state.from.pathname
        : "/products";
      navigate(redirectTo, { replace: true });
    } else {
      setSubmitError(result?.error || 'Invalid username or password');
    }
    setSubmitting(false);
  };

  return (
    <div className="container" style={{ minHeight: "calc(100vh - 120px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 420,
          width: "100%",
          margin: "90px auto 60px auto",
          background: "var(--surface-color)",
          borderRadius: 16,
          padding: "38px 34px 28px 34px",
          boxShadow: "0 5px 32px 0 #d4af3738,0 2px 16px 0 #8b5cf608",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          border: "1.8px solid var(--border-color)",
        }}
        autoComplete="off"
      >
        <div style={{ textAlign: "center", marginBottom: 5 }}>
          <div className="subtitle"
            style={{
              marginBottom: 4,
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--secondary-color)",
              letterSpacing: 0.5
            }}>
            Welcome Back
          </div>
          <div className="description" style={{ margin: 0 }}>
            Sign in to your ShopWebsite account
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="username" style={{ fontWeight: 600, fontSize: "1.04rem", letterSpacing: "0.01em" }}>Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            disabled={submitting}
            style={{
              padding: "13px 15px",
              border: `2px solid ${errors.username ? "#e6204c" : "var(--input-border)"}`,
              borderRadius: 6,
              fontSize: "1.07rem",
              fontWeight: 500,
              background: "var(--input-bg)",
              color: "var(--text-color)",
              outline: errors.username ? "2px solid #e6204c" : "none",
              boxShadow: errors.username ? "0 0 0 2px #e6204c55" : "var(--focus-ring)",
              transition: "border 0.18s, box-shadow 0.18s",
              marginBottom: 2,
            }}
            placeholder="Enter your username"
          />
          {errors.username && (
            <div style={{ color: "#e6204c", fontSize: ".98rem", marginTop: 2, marginBottom: 3 }}>{errors.username}</div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="password" style={{ fontWeight: 600, fontSize: "1.04rem", letterSpacing: "0.01em" }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            disabled={submitting}
            style={{
              padding: "13px 15px",
              border: `2px solid ${errors.password ? "#e6204c" : "var(--input-border)"}`,
              borderRadius: 6,
              fontSize: "1.07rem",
              fontWeight: 500,
              background: "var(--input-bg)",
              color: "var(--text-color)",
              outline: errors.password ? "2px solid #e6204c" : "none",
              boxShadow: errors.password ? "0 0 0 2px #e6204c55" : "var(--focus-ring)",
              transition: "border 0.18s, box-shadow 0.18s",
              marginBottom: 2,
            }}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div style={{ color: "#e6204c", fontSize: ".98rem", marginTop: 2, marginBottom: 3 }}>{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-large"
          style={{
            marginTop: 7,
            fontWeight: 700,
            fontSize: "1.13rem",
            borderRadius: 7,
            background: "var(--secondary-color)",
            color: "white",
            letterSpacing: 0.03,
            boxShadow: "var(--btn-hover-shadow)",
            transition: "background 0.18s, color 0.14s, box-shadow 0.18s",
            opacity: submitting ? 0.62 : 1,
            cursor: submitting ? "not-allowed" : "pointer",
          }}
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Login"}
        </button>
        {submitError && (
          <div style={{ color: "#e6204c", marginTop: 10, marginBottom: 2, textAlign: "center", fontWeight: 600, fontSize: "1.03rem" }}>{submitError}</div>
        )}
        <div style={{ color: "var(--text-secondary)", fontSize: ".98rem", textAlign: "center", marginTop: 6 }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "var(--accent-color)", textDecoration: "underline", fontWeight: 600 }}>
            Register
          </a>
        </div>
        <div style={{ fontSize: ".9rem", color: "var(--text-secondary)", textAlign: "center", marginTop: 4 }}>
          {/* Login is powered by the REST API layer */}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
