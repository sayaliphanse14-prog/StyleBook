// PRACTICAL 5: useState + useEffect
// PRACTICAL 8: Axios GET/PUT/DELETE - completes the full CRUD cycle on frontend

import React, { useState, useEffect } from "react";
import API from "../api/axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data.data);
    } catch (err) {
      setMessage("Could not load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // UPDATE - cancel an appointment (status change) demonstrates PUT
  const handleCancel = async (id) => {
    try {
      await API.put(`/appointments/${id}`, { status: "Cancelled" });
      fetchAppointments(); // refresh list
    } catch (err) {
      setMessage("Could not update appointment");
    }
  };

  // DELETE - remove an appointment completely
  const handleDelete = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch (err) {
      setMessage("Could not delete appointment");
    }
  };

  if (loading) return <p className="center">Loading appointments...</p>;

  return (
    <div className="appointments-page">
      <h2>My Appointments</h2>
      {message && <p className="error-text">{message}</p>}

      {appointments.length === 0 ? (
        <p>You have no appointments yet.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.service?.name}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status !== "Cancelled" && (
                    <button className="link-btn" onClick={() => handleCancel(appt._id)}>
                      Cancel
                    </button>
                  )}
                  <button className="link-btn danger" onClick={() => handleDelete(appt._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyAppointments;
