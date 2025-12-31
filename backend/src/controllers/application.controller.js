import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Create application for a job
export async function createJobApplication(req, res) {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "Resume PDF is required" });
    }

    const resumePath = req.files.resume[0].path;

    const application = await Application.create({
      jobId,
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      currentCTC: Number(req.body.currentCTC) || 0,
      expectedCTC: Number(req.body.expectedCTC),
      currentOrganization: req.body.currentOrganization,
      resume: resumePath,
      status: req.body.status || "Open",
      comment: req.body.comment || "",
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all applications for a job
export async function getApplicationsByJob(req, res) {
  try {
    const jobId = req.params.id;
    const applications = await Application.find({ jobId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update comment
export async function updateComment(req, res) {
  try {
    const { id } = req.params; // application ID
    const { comment } = req.body;

    if (!comment) return res.status(400).json({ error: "Comment is required" });

    const application = await Application.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );

    if (!application) return res.status(404).json({ error: "Application not found" });

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH /application/:id/status
export async function updateStatus(req, res) {
  try {
    const { id } = req.params; // application ID
    const { status } = req.body;

    const allowedStatus = ["Open", "Rejected", "Offered", "In Interview", "Waiting for Feedback"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!application) return res.status(404).json({ error: "Application not found" });

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

