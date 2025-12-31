import { useEffect, useState } from "react";
import { getJobs } from "../services/api";
import { getUserRole } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function JobList() {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem("token");
    const role = getUserRole();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs(token);
                setJobs(res.data);
            } catch (err) {
                alert(err.response?.data?.error || "Failed to fetch jobs");
            }
        };
        fetchJobs();
    }, [token]);

    const totalPages = jobs.length;
    const currentJob = jobs[currentPage - 1]; // 1 job per page

    const updateStatus = async (jobId, status) => {
        try {
            await fetch(`http://localhost:4000/jobs/${jobId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            // update UI locally
            setJobs(prev =>
                prev.map(job =>
                    job._id === jobId ? { ...job, status } : job
                )
            );
        } catch {
            alert("Failed to update status");
        }
    };

    if (jobs.length === 0) {
        return (
            <div className="container">
                <h2>All Job Posts</h2>
                <p>Nothing Found</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>All Job Posts</h2>

            {currentJob && (
                <div className="job-card">
                    <h3>{currentJob.positionName}</h3>

                    <p><strong>Location:</strong> {currentJob.location}</p>
                    <p><strong>Job Type:</strong> {currentJob.jobType}</p>

                    {/* STATUS */}
                    <p>
                        <strong>Status:</strong>{" "}
                        {role === "HR" ? (
                            <select
                                className={`status-select status-${currentJob.status.replace(/\s/g, "-").toLowerCase()}`}
                                value={currentJob.status}
                                onChange={(e) =>
                                    updateStatus(currentJob._id, e.target.value)
                                }
                            >
                                <option value="Open">Open</option>
                                <option value="Close">Close</option>
                                <option value="interview going-on">Interview going-on</option>
                                <option value="offered">Offered</option>
                            </select>
                        ) : (
                            <span
                                className={`status status-${currentJob.status.replace(/\s/g, "-").toLowerCase()}`}
                            >
                                {currentJob.status}
                            </span>
                        )}
                    </p>


                    <p><strong>Budget:</strong> {currentJob.budgetMin} - {currentJob.budgetMax} LPA</p>
                    <p><strong>Experience:</strong> {currentJob.expMin} - {currentJob.expMax} years</p>

                    <p><strong>Description:</strong></p>
                    <ul>
                        {currentJob.description.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>

                    <p><strong>Skills:</strong> {currentJob.skills.join(", ")}</p>
                    <p><em>Posted on: {new Date(currentJob.createdAt).toLocaleString()}</em></p>
                    <div className="job-actions" style={{ marginBottom: "10px" }}>
                        <button onClick={() => navigate(`/job/${currentJob._id}/new-application`)}>
                            Apply New Application
                        </button>
                        <button onClick={() => navigate(`/job/${currentJob._id}/applications`)}>
                            View Applications
                        </button>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
