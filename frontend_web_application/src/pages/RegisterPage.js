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
      aria-label="Register page background"
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          margin: "55px auto",
          background: "var(--surface-color)",
          borderRadius: 20,
          padding: "56px 40px 38px 40px",
          boxShadow: "0 8px 40px 0 #8b5cf649,0 2px 16px 0 #d4af3745",
          border: "2px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
        role="region"
        aria-label="Register card"
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
              lineHeight: 1.08,
              textTransform: "uppercase",
            }}
          >
            Create Account
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
            Join ShopWebsite to start shopping today
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 21,
            margin: 0,
          }}
          role="form"
          aria-label="Register form"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              htmlFor="username"
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--primary-color)",
                letterSpacing: ".007em",
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
                padding: "15px 17px",
                border: `2.5px solid ${errors.username ? "#e6204c" : "var(--input-border)"}`,
                borderRadius: 8,
                fontSize: "1.16rem",
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
              placeholder="Choose a username"
            />
            {errors.username && (
              <div
                id="username-error"
                style={{
                  color: "#e6204c",
                  fontSize: ".98rem",
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
                fontSize: "1.1rem",
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
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              style={{
                padding: "15px 17px",
                border: `2.5px solid ${errors.password ? "#e6204c" : "var(--input-border)"}`,
                borderRadius: 8,
                fontSize: "1.16rem",
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
              placeholder="Create a password"
            />
            {errors.password && (
              <div
                id="password-error"
                style={{
                  color: "#e6204c",
                  fontSize: ".98rem",
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
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label
              htmlFor="password2"
              style={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--primary-color)",
                letterSpacing: ".007em",
              }}
            >
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              autoComplete="new-password"
              value={form.password2}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.password2}
              aria-describedby={errors.password2 ? "password2-error" : undefined}
              style={{
                padding: "15px 17px",
                border: `2.5px solid ${errors.password2 ? "#e6204c" : "var(--input-border)"}`,
                borderRadius: 8,
                fontSize: "1.16rem",
                fontWeight: 500,
                background: "#F5F5F5",
                color: "var(--text-color)",
                outline: errors.password2 ? "2px solid #e6204c" : "none",
                boxShadow: errors.password2
                  ? "0 0 0 2px #e6204c55"
                  : "0 0 0 2px #8B5CF625",
                transition: "border 0.18s, box-shadow 0.18s",
                marginBottom: 0,
              }}
              placeholder="Re-enter password"
            />
            {errors.password2 && (
              <div
                id="password2-error"
                style={{
                  color: "#e6204c",
                  fontSize: ".98rem",
                  marginTop: 2,
                  marginBottom: 1,
                  fontWeight: 500,
                  letterSpacing: 0.01,
                }}
                role="alert"
              >
                {errors.password2}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-large"
            style={{
              marginTop: 9,
              fontWeight: 900,
              fontSize: "1.18rem",
              borderRadius: 11,
              background: "linear-gradient(90deg, var(--secondary-color) 13%, var(--accent-color) 87%)",
              color: "white",
              letterSpacing: 0.07,
              boxShadow: "0 4px 17px #8b5cf649, 0 0.9px 9px #d4af3760",
              border: 0,
              outline: 0,
              transition: "background 0.18s, color 0.16s, box-shadow 0.2s",
              opacity: submitting ? 0.62 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
              minHeight: 50,
              marginBottom: 3,
              marginTop: 5,
            }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span style={{ marginRight: 8, fontSize: "1.15em" }}>⏳</span> Registering...
              </>
            ) : (
              <>
                <span style={{ marginRight: 8, fontSize: "1.21em" }}>✦</span> Register
              </>
            )}
          </button>
          {submitError && (
            <div
              style={{
                color: "#e6204c",
                marginTop: 11,
                marginBottom: 2,
                textAlign: "center",
                fontWeight: 700,
                fontSize: "1.07rem",
                letterSpacing: 0.01,
              }}
              role="alert"
            >
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div
              style={{
                color: "var(--accent-color)",
                marginTop: 11,
                marginBottom: 2,
                textAlign: "center",
                fontWeight: 800,
                fontSize: "1.08rem",
                letterSpacing: 0.01,
              }}
              role="status"
            >
              {submitSuccess}
            </div>
          )}
          <div
            style={{
              color: "var(--accent-color)",
              fontSize: "1.04rem",
              textAlign: "center",
              marginTop: 6,
              fontWeight: 650,
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "var(--secondary-color)",
                textDecoration: "underline",
                fontWeight: 900,
                marginLeft: 2,
              }}
            >
              Login
            </a>
          </div>
        </form>
        <div
          style={{
            fontSize: ".96rem",
            color: "var(--text-secondary)",
            textAlign: "center",
            marginTop: 14,
            paddingTop: 3,
            borderTop: "1px dashed var(--border-color)",
          }}
        >
          {/* Registration is powered by the REST API layer */}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
