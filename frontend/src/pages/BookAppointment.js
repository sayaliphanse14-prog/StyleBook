// PRACTICAL 5: useParams hook (reads dynamic route segment), useState, useEffect
// PRACTICAL 8: Axios GET (fetch one service) + POST (create appointment) - CRUD

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function BookAppointment() {
  const { serviceId } = useParams(); // grabs :serviceId from the URL
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await API.get(`/services/${serviceId}`);
        setService(res.data.data);
      } catch (err) {
        setError("Could not load service details");
      }
    };
    fetchService();
  }, [serviceId]); // re-run if the serviceId in the URL changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!date || !time) {
      setError("Please select both date and time");
      return;
    }

    try {
      await API.post("/appointments", { service: serviceId, date, time });
      setSuccess("Appointment booked successfully!");
      setTimeout(() => navigate("/my-appointments"), 1200);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      setError(apiErrors ? apiErrors.join(", ") : "Booking failed");
    }
  };

  if (!service) return <p className="center">Loading service...</p>;

  return (
    <div className="form-page">
      <h2>Book: {service.name}</h2>
      <p className="price">Price: ₹{service.price}</p>

      <form onSubmit={handleSubmit}>
        <label>Select Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Select Time</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <button type="submit" className="btn">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookAppointment;
