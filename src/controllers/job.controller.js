import Job from "../models/job.model.js";

export async function createJob(req, res) {
  try {
    console.log(req.user)
    const job = await Job.create({
      positionName: req.body.positionName,
      description: req.body.description,

      budgetMin: Number(req.body.budgetMin),
      budgetMax: Number(req.body.budgetMax),
      expMin: Number(req.body.expMin),
      expMax: Number(req.body.expMax),

      location: req.body.location || "Bangalore",
      jobType: req.body.jobType || "Full time",
      status: req.body.status || "Open",
      skills: req.body.skills,
      createdBy: req.user.id, 
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find(); // return all jobs with all fields
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id); // get all fields
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function updateJobStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Optional: validate status
    const allowedStatus = ["Open", "Close", "interview going-on", "offered"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const job = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated document
    );

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
