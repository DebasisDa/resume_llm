import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewApplications.css";

export default function ViewApplications() {
  const { jobId } = useParams();
  const token = localStorage.getItem("token");
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:4000/job/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchApplications();
  }, [jobId, token]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "open": return "va-status-open";
      case "rejected": return "va-status-rejected";
      case "offered": return "va-status-offered";
      case "in interview": return "va-status-interview";
      case "waiting for feedback": return "va-status-waiting";
      default: return "";
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:4000/application/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");

      setApplications(prev =>
        prev.map(app => app._id === id ? { ...app, status: newStatus } : app)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const updateComment = async (id, newComment) => {
    try {
      const res = await fetch(`http://localhost:4000/application/${id}/comment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });
      if (!res.ok) throw new Error("Failed to update comment");

      setApplications(prev =>
        prev.map(app => app._id === id ? { ...app, comment: newComment } : app)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="va-container">
      <h2>Applications for Job ID: {jobId}</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="va-table-wrapper">
          <table className="va-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Current CTC</th>
                <th>Expected CTC</th>
                <th>Organization</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td>{app.phoneNumber}</td>
                  <td>{app.currentCTC} LPA</td>
                  <td>{app.expectedCTC} LPA</td>
                  <td>{app.currentOrganization}</td>

                  <td>
                    <select
                      className={getStatusClass(app.status)}
                      value={app.status}
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Offered">Offered</option>
                      <option value="In Interview">In Interview</option>
                      <option value="Waiting for Feedback">Waiting for Feedback</option>
                    </select>
                  </td>

                  <td>
                    <textarea
                      value={app.comment || ""}
                      onChange={(e) => updateComment(app._id, e.target.value)}
                      rows={3}
                      placeholder="Add comment..."
                    />
                  </td>

                  <td>
                    <a
                      href={`http://localhost:4000/${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
