import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJob } from "../services/api"; // make sure API service is ready

export default function PostJob() {
  const [form, setForm] = useState({
    positionName: "",
    description: [],
    budgetMin: "",
    budgetMax: "",
    expMin: "",
    expMax: "",
    location: "",
    jobType: "Full time",
    status: "Open",
    skills: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle description as comma separated
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, description: value.split("\n") });
  };

  // Handle skills as comma separated
  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, skills: value.split(",").map((s) => s.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.positionName || form.description.length === 0) {
      setError("Position Name and Description are required");
      return;
    }

    try {
      await postJob(form, token);
      alert("Job posted successfully!");
      navigate("/jobs"); // redirect to job list page
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post job");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Create New Job</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input type="text" name="positionName" placeholder="Position Name" value={form.positionName} onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description (one line per item)"
          value={form.description.join("\n")}
          onChange={handleDescriptionChange}
          rows={10}
        />

        <input type="text" name="skills" placeholder="Skills (comma separated)" value={form.skills.join(", ")} onChange={handleSkillsChange} />

        <div style={{ display: "flex", gap: "10px" }}>
          <input type="number" name="budgetMin" placeholder="Budget Min (LPA)" value={form.budgetMin} onChange={handleChange} />
          <input type="number" name="budgetMax" placeholder="Budget Max (LPA)" value={form.budgetMax} onChange={handleChange} />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input type="number" name="expMin" placeholder="Experience Min (yrs)" value={form.expMin} onChange={handleChange} />
          <input type="number" name="expMax" placeholder="Experience Max (yrs)" value={form.expMax} onChange={handleChange} />
        </div>

        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} />

        <select name="jobType" value={form.jobType} onChange={handleChange}>
          <option value="Full time">Full time</option>
          <option value="Part time">Part time</option>
          <option value="Internship">Internship</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Open">Open</option>
          {/* <option value="Close">Close</option>
          <option value="interview going-on">Interview going-on</option>
          <option value="offered">Offered</option> */}
        </select>

        <button type="submit" style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>Post Job</button>
      </form>
    </div>
  );
}
