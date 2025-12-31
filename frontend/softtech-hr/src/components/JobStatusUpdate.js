import { useState } from "react";
import { getUserRole } from "../utils/auth";
import "./JobStatusUpdate.css";

export default function JobStatusUpdate({ jobId, currentStatus }) {
  const role = getUserRole();
  const [status, setStatus] = useState(currentStatus);

  if (role !== "HR") {
    return (
      <span className={`badge ${currentStatus.replace(/\s/g, "-")}`}>
        {currentStatus}
      </span>
    );
  }

  const updateStatus = async () => {
    await fetch(`http://localhost:4000/jobs/${jobId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <div className="status-box">
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option>Open</option>
        <option>Close</option>
        <option>interview going-on</option>
        <option>offered</option>
      </select>
      <button onClick={updateStatus}>Update</button>
    </div>
  );
}
