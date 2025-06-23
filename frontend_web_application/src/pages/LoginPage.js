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
    <div
      className="container"
      style={{
        minHeight: "calc(100vh - 120px)",
        background: "var(--background-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 34,
        paddingBottom: 34,
      }}
      aria-label="Login page background"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "55px auto",
          background: "var(--surface-color)",
          borderRadius: 18,
          padding: "53px 38px 35px 38px",
          boxShadow: "0 7px 36px 0 #8b5cf642,0 2px 14px 0 #d4af3741",
          border: "2px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
        role="region"
        aria-label="Login card"
      >
        <div style={{ textAlign: "center", marginBottom: 7 }}>
          <div
            className="subtitle"
            style={{
              marginBottom: 3,
              fontWeight: 900,
              fontSize: "2.1rem",
              color: "var(--accent-color)",
              letterSpacing: 0.7,
              textShadow: "0 1px 0 #fff4, 0 2px 8px #8b5cf623",
              lineHeight: 1.09,
              textTransform: "uppercase",
            }}
          >
            Welcome Back
          </div>
          <div
            className="description"
            style={{
              margin: 0,
              color: "var(--text-secondary)",
              fontWeight: 500,
              fontSize: "1.08rem",
            }}
          >
            Sign in to your ShopWebsite account
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            margin: 0,
          }}
          role="form"
          aria-label="Login form"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              htmlFor="username"
              style={{
                fontWeight: 700,
                fontSize: "1.08rem",
                color: "var(--primary-color)",
                letterSpacing: ".007em"
              }}
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              style={{
                padding: "15px 16px",
                border: `2.5px solid ${errors.username ? "#e6204c" : "var(--input-border)"}`,
                borderRadius: 7,
                fontSize: "1.13rem",
                fontWeight: 500,
                background: "#F5F5F5",
                color: "var(--text-color)",
                outline: errors.username ? "2px solid #e6204c" : "none",
                boxShadow: errors.username
                  ? "0 0 0 2px #e6204c55"
                  : "0 0 0 2px #8B5CF625",
                transition: "border 0.18s, box-shadow 0.18s",
                marginBottom: 0,
              }}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div
                id="username-error"
                style={{
                  color: "#e6204c",
                  fontSize: ".99rem",
                  marginTop: 2,
                  marginBottom: 1,
                  fontWeight: 500,
                  letterSpacing: 0.01,
                }}
                role="alert"
              >
                {errors.username}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              htmlFor="password"
              style={{
                fontWeight: 700,
                fontSize: "1.08rem",
                color: "var(--primary-color)",
                letterSpacing: ".007em",
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              style={{
                padding: "15px 16px",
                border: `2.5px solid ${errors.password ? "#e6204c" : "var(--input-border)"}`,
                borderRadius: 7,
                fontSize: "1.13rem",
                fontWeight: 500,
                background: "#F5F5F5",
                color: "var(--text-color)",
                outline: errors.password ? "2px solid #e6204c" : "none",
                boxShadow: errors.password
                  ? "0 0 0 2px #e6204c55"
                  : "0 0 0 2px #8B5CF625",
                transition: "border 0.18s, box-shadow 0.18s",
                marginBottom: 0,
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div
                id="password-error"
                style={{
                  color: "#e6204c",
                  fontSize: ".99rem",
                  marginTop: 2,
                  marginBottom: 1,
                  fontWeight: 500,
                  letterSpacing: 0.01,
                }}
                role="alert"
              >
                {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-large"
            style={{
              marginTop: 8,
              fontWeight: 800,
              fontSize: "1.22rem",
              borderRadius: 10,
              background: "linear-gradient(90deg, var(--secondary-color) 10%, var(--accent-color) 90%)",
              color: "white",
              letterSpacing: 0.06,
              boxShadow: "0 4px 17px #8b5cf648, 0 1.5px 12px #d4af3760",
              border: 0,
              outline: 0,
              transition: "background 0.18s, color 0.16s, box-shadow 0.2s",
              opacity: submitting ? 0.62 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
              minHeight: 49,
              marginBottom: 3,
            }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span style={{ marginRight: 8, fontSize: "1.15em" }}>⏳</span> Signing in...
              </>
            ) : (
              <>
                <span style={{ marginRight: 8, fontSize: "1.2em" }}>→</span> Login
              </>
            )}
          </button>
          {submitError && (
            <div
              style={{
                color: "#e6204c",
                marginTop: 10,
                marginBottom: 2,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "1.06rem",
                letterSpacing: 0.01
              }}
              role="alert"
            >
              {submitError}
            </div>
          )}
          <div
            style={{
              color: "var(--accent-color)",
              fontSize: "1.03rem",
              textAlign: "center",
              marginTop: 6,
              fontWeight: 600,
              letterSpacing: 0.01,
            }}
          >
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                color: "var(--secondary-color)",
                textDecoration: "underline",
                fontWeight: 800,
                marginLeft: 2,
              }}
            >
              Register
            </a>
          </div>
        </form>
        <div
          style={{
            fontSize: ".95rem",
            color: "var(--text-secondary)",
            textAlign: "center",
            marginTop: 14,
            paddingTop: 3,
            borderTop: "1px dashed var(--border-color)",
          }}
        >
          {/* Login is powered by the REST API layer */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
