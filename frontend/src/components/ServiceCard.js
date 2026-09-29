// PRACTICAL 4: React Props - passing data from parent (Services page) to child

import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p className="price">₹{service.price}</p>
      <p className="desc">{service.description}</p>
      <Link to={`/book/${service._id}`} className="btn">Book Now</Link>
    </div>
  );
}

export default ServiceCard;
