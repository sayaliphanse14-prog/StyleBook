// PRACTICAL 5: useState + useEffect Hooks
// PRACTICAL 8: Axios GET request to REST API (READ operation)

import React, { useState, useEffect } from "react";
import API from "../api/axios";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const [services, setServices] = useState([]); // state to hold service list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect runs once when the component mounts - fetches data from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services");
        setServices(res.data.data);
      } catch (err) {
        setError("Could not load services. Make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // empty array = run only once

  if (loading) return <p className="center">Loading services...</p>;
  if (error) return <p className="center error-text">{error}</p>;

  return (
    <div className="services-page">
      <h2>Our Services</h2>
      <div className="service-grid">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default Services;
