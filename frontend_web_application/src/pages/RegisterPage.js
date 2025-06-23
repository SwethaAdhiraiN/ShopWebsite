import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { register as apiRegister } from '../api/api';

// PUBLIC_INTERFACE
function RegisterPage() {
  /**
   * Controlled registration form with validations and error display.
   * Uses API register function and handles response.
   */
  const { login } = useAuth(); // Placeholder for future: auto-login after registration

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
      const result = await apiRegister(form.username, form.password);
      if (result.success) {
        setSubmitSuccess('Registered successfully! You can now login.');
        setSubmitting(false);
        setForm({ username: '', password: '', password2: '' });
        // Optionally: await login(form.username, form.password); // auto-login
      } else {
        setSubmitError(result.error || 'Registration failed');
        setSubmitting(false);
      }
    } catch (err) {
      setSubmitError('Registration failed (unexpected error)');
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 420,
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
          <div className="subtitle" style={{ marginBottom: 4, fontWeight: 700, fontSize: '1.5rem', color: 'var(--base-light)' }}>Register</div>
          <div className="description" style={{ margin: 0 }}>
            Create your ShopWebsite account
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
          autoComplete="new-password"
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

        <label htmlFor="password2" style={{ fontWeight: 500 }}>Confirm Password</label>
        <input
          id="password2"
          name="password2"
          type="password"
          autoComplete="new-password"
          value={form.password2}
          onChange={handleChange}
          disabled={submitting}
          style={{
            padding: '10px 12px',
            border: '1px solid var(--border-color)',
            borderRadius: 4,
            fontSize: '1rem',
            background: '#18213c',
            color: 'var(--text-color)',
            outline: errors.password2 ? '2px solid #e6204c' : 'none',
          }}
        />
        {errors.password2 && (
          <div style={{ color: '#e6204c', fontSize: '.95rem', marginTop: -10, marginBottom: 9 }}>{errors.password2}</div>
        )}

        <button
          type="submit"
          className="btn btn-large"
          style={{
            marginTop: 12,
            fontWeight: 600,
            fontSize: '1.12rem',
            borderRadius: 5,
            background: 'var(--base-light)',
            color: 'white',
            opacity: submitting ? 0.67 : 1,
            cursor: submitting ? 'default' : 'pointer',
          }}
          disabled={submitting}
        >
          {submitting ? 'Registering...' : 'Register'}
        </button>
        {submitError && (
          <div style={{ color: '#e6204c', marginTop: 14, textAlign: 'center', fontWeight: 500 }}>{submitError}</div>
        )}
        {submitSuccess && (
          <div style={{ color: 'var(--base-light)', marginTop: 14, textAlign: 'center', fontWeight: 600 }}>{submitSuccess}</div>
        )}
        <div style={{ color: 'var(--text-secondary)', fontSize: '.96rem', textAlign: 'center', marginTop: 8 }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: 'var(--base-light)', textDecoration: 'underline' }}>
            Login
          </a>
        </div>
        <div style={{ fontSize: '.86rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: 5 }}>
          {/* Now uses REST API layer for registration */}
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
