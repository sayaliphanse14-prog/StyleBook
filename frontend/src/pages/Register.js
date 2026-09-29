// PRACTICAL 5: useState hook for controlled form inputs
// PRACTICAL 3/8: Client-side validation + Axios POST request
// PRACTICAL 10: User registration (authentication)

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // single handler for all inputs (controlled components pattern)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // basic client-side validation before hitting the API
  const validate = () => {
    const newErrors = [];
    if (!formData.name.trim()) newErrors.push("Name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.push("Enter a valid email");
    if (formData.password.length < 6)
      newErrors.push("Password must be at least 6 characters");
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.push("Phone number must be 10 digits");
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);

    try {
      const res = await API.post("/auth/register", formData);
      login(res.data.user, res.data.token);
      setMessage("Registration successful!");
      navigate("/services");
    } catch (err) {
      const apiErrors = err.response?.data?.errors || [err.response?.data?.message] || ["Registration failed"];
      setErrors(apiErrors);
    }
  };

  return (
    <div className="form-page">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />

        <label>Phone Number</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

        {errors.length > 0 && (
          <ul className="error-list">
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        )}
        {message && <p className="success-text">{message}</p>}

        <button type="submit" className="btn">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;
