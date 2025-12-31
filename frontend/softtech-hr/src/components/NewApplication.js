import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NewApplication.css";

export default function NewApplication() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    currentCTC: "",
    expectedCTC: "",
    currentOrganization: "",
    comment: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload a PDF resume.");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    formData.append("resume", resumeFile);

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:4000/job/${jobId}/application`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to submit application");
      alert("Application submitted successfully!");
      navigate(`/job/${jobId}/applications`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Current CTC:
          <input type="number" name="currentCTC" value={form.currentCTC} onChange={handleChange} required />
        </label>
        <label>
          Expected CTC:
          <input type="number" name="expectedCTC" value={form.expectedCTC} onChange={handleChange} required />
        </label>
        <label>
          Current Organization:
          <input type="text" name="currentOrganization" value={form.currentOrganization} onChange={handleChange} required />
        </label>
        <label>
          Comment:
          <textarea name="comment" value={form.comment} onChange={handleChange} rows={3} />
        </label>
        <label>
          Resume (PDF only):
          <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        </label>

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Application"}</button>
      </form>
    </div>
  );
}
