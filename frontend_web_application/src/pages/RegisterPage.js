import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
function RegisterPage() {
  /**
   * Controlled registration form with validations and error display.
   * Uses AuthContext tryRegister and redirects to products on success.
   */
  const { tryRegister } = useAuth();

  const navigate = useNavigate();

  // Controlled fields
  const [form, setForm] = useState({ username: '', password: '', password2: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Field onChange
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setSubmitError('');
    setSubmitSuccess('');
  };

  // Validate registration fields
  const validate = () => {
    const newErr = {};
    if (!form.username.trim()) newErr.username = 'Username is required';
    if (!form.password) newErr.password = 'Password is required';
    else if (form.password.length < 6) newErr.password = 'Password must be at least 6 characters';
    if (form.password2 !== form.password) newErr.password2 = 'Passwords do not match';
    return newErr;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess('');
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSubmitError('');
      return;
    }
    setSubmitting(true);
    setErrors({});
    setSubmitError('');
    try {
      const result = await tryRegister(form.username, form.password);
      if (result && result.success) {
        // Registration succeeded, immediately redirect to product browsing
        setSubmitSuccess('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate("/products", { replace: true });
        }, 500); // short delay for feedback
      } else {
        setSubmitError(result?.error || 'Registration failed');
        setSubmitting(false);
      }
    } catch (err) {
      setSubmitError('Registration failed (unexpected error)');
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: "calc(100vh - 120px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 480,
          width: "100%",
          margin: "85px auto 65px auto",
          background: "var(--surface-color)",
          borderRadius: 16,
          padding: "38px 34px 27px 34px",
          boxShadow: "0 6px 34px 0 #d4af373f,0 2px 16px 0 #8b5cf609",
          display: "flex",
          flexDirection: "column",
          gap: 23,
          border: "2px solid var(--border-color)",
        }}
        autoComplete="off"
      >
        <div style={{ textAlign: "center", marginBottom: 3 }}>
          <div className="subtitle"
            style={{
              marginBottom: 4,
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--secondary-color)",
              letterSpacing: 0.5
            }}>
            Create Account
          </div>
          <div className="description" style={{ margin: 0 }}>
            Join ShopWebsite to start shopping today
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="username" style={{ fontWeight: 600, fontSize: "1.03rem" }}>Username</label>
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
            placeholder="Choose a username"
          />
          {errors.username && (
            <div style={{ color: "#e6204c", fontSize: ".98rem", marginTop: 2, marginBottom: 3 }}>{errors.username}</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="password" style={{ fontWeight: 600, fontSize: "1.03rem" }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
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
            placeholder="Create a password"
          />
          {errors.password && (
            <div style={{ color: "#e6204c", fontSize: ".98rem", marginTop: 2, marginBottom: 3 }}>{errors.password}</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="password2" style={{ fontWeight: 600, fontSize: "1.03rem" }}>Confirm Password</label>
          <input
            id="password2"
            name="password2"
            type="password"
            autoComplete="new-password"
            value={form.password2}
            onChange={handleChange}
            disabled={submitting}
            style={{
              padding: "13px 15px",
              border: `2px solid ${errors.password2 ? "#e6204c" : "var(--input-border)"}`,
              borderRadius: 6,
              fontSize: "1.07rem",
              fontWeight: 500,
              background: "var(--input-bg)",
              color: "var(--text-color)",
              outline: errors.password2 ? "2px solid #e6204c" : "none",
              boxShadow: errors.password2 ? "0 0 0 2px #e6204c55" : "var(--focus-ring)",
              transition: "border 0.18s, box-shadow 0.18s",
              marginBottom: 2,
            }}
            placeholder="Re-enter password"
          />
          {errors.password2 && (
            <div style={{ color: "#e6204c", fontSize: ".98rem", marginTop: 2, marginBottom: 3 }}>{errors.password2}</div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-large"
          style={{
            marginTop: 9,
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
          {submitting ? "Registering..." : "Register"}
        </button>
        {submitError && (
          <div style={{ color: "#e6204c", marginTop: 12, marginBottom: 2, textAlign: "center", fontWeight: 600, fontSize: "1.03rem" }}>{submitError}</div>
        )}
        {submitSuccess && (
          <div style={{ color: "var(--accent-color)", marginTop: 12, marginBottom: 2, textAlign: "center", fontWeight: 700, fontSize: "1.06rem" }}>{submitSuccess}</div>
        )}
        <div style={{ color: "var(--text-secondary)", fontSize: ".98rem", textAlign: "center", marginTop: 7 }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "var(--accent-color)", textDecoration: "underline", fontWeight: 600 }}>
            Login
          </a>
        </div>
        <div style={{ fontSize: ".9rem", color: "var(--text-secondary)", textAlign: "center", marginTop: 4 }}>
          {/* Registration is powered by the REST API layer */}
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
