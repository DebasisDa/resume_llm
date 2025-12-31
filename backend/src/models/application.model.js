import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    currentCTC: { type: Number },
    expectedCTC: { type: Number },
    currentOrganization: { type: String },
    resume: { type: String, required: true }, // file path / URL
    status: {
      type: String,
      enum: ["Open", "Rejected", "Offered", "In Interview"],
      default: "Open",
    },
    comment: { type: String, default: "" }, // single comment field
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
