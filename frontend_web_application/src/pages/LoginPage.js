import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/api';

// PUBLIC_INTERFACE
function LoginPage() {
  /**
   * Controlled login form with validations and error display.
   * Uses API login function; integrates with AuthContext.
   */
  const { login: authLogin } = useAuth();

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

    // Call real API logic, then set context
    const result = await apiLogin(form.username, form.password);
    if (result.success) {
      // Update AuthContext, if available
      if (typeof authLogin === 'function') {
        await authLogin(form.username, form.password); // This is for compatibility; real login state handled outside here
      }
      // You can redirect after login here
    } else {
      setSubmitError(result.error || 'Invalid username or password');
    }
    setSubmitting(false);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 380,
          margin: '110px auto 0 auto',
          background: 'rgba(10,20,40,0.82)',
          borderRadius: 12,
          padding: '32px 32px 24px 32px',
          boxShadow: '0 4px 32px rgba(0,255,255,0.09)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
        autoComplete="off"
      >
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div className="subtitle" style={{ marginBottom: 5, fontWeight: 700, fontSize: '1.5rem', color: 'var(--base-light)' }}>Login</div>
          <div className="description" style={{ margin: 0 }}>
            Sign in to your ShopWebsite account
          </div>
        </div>
        <label htmlFor="username" style={{ fontWeight: 500 }}>Username</label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          value={form.username}
          onChange={handleChange}
          disabled={submitting}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: 4,
            fontSize: '1rem',
            background: '#18213c',
            color: 'var(--text-color)',
            outline: errors.username ? '2px solid #e6204c' : 'none',
          }}
        />
        {errors.username && (
          <div style={{ color: '#e6204c', fontSize: '.95rem', marginTop: -10, marginBottom: 9 }}>{errors.username}</div>
        )}

        <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          disabled={submitting}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: 4,
            fontSize: '1rem',
            background: '#18213c',
            color: 'var(--text-color)',
            outline: errors.password ? '2px solid #e6204c' : 'none',
          }}
        />
        {errors.password && (
          <div style={{ color: '#e6204c', fontSize: '.95rem', marginTop: -10, marginBottom: 9 }}>{errors.password}</div>
        )}

        <button
          type="submit"
          className="btn btn-large"
          style={{
            marginTop: 12,
            fontWeight: 600,
            fontSize: '1.11rem',
            borderRadius: 5,
            background: 'var(--base-light)',
            color: 'white',
            opacity: submitting ? 0.65 : 1,
            cursor: submitting ? 'default' : 'pointer',
          }}
          disabled={submitting}
        >
          {submitting ? 'Signing in...' : 'Login'}
        </button>
        {submitError && (
          <div style={{ color: '#e6204c', marginTop: 12, textAlign: 'center', fontWeight: 500 }}>{submitError}</div>
        )}
        <div style={{ color: 'var(--text-secondary)', fontSize: '.96rem', textAlign: 'center', marginTop: 8 }}>
          Don&apos;t have an account?{" "}
          <a href="/register" style={{ color: 'var(--base-light)', textDecoration: 'underline' }}>
            Register
          </a>
        </div>
        <div style={{ fontSize: '.86rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: 5 }}>
          {/* Now uses REST API layer for login */}
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
