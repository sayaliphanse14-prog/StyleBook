// PRACTICAL 4: Functional React component (page-level)

import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <h1>Welcome to StyleBook Salon</h1>
      <p>Book your favorite salon services online, anytime, anywhere.</p>
      <Link to="/services" className="btn">View Services</Link>
    </div>
  );
}

export default Home;
