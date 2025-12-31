import mongoose from "mongoose";

export default mongoose.model(
  "Job",
  new mongoose.Schema(
    {
      positionName: String,
      description:  [String],

      budgetMin: Number,   // 6
      budgetMax: Number,   // 10 (LPA)

      expMin: Number,      // 3
      expMax: Number,      // 5 (years)

      location: {
        type: String,
        default: "Bangalore",
      },
      jobType: {
        type: String,
        default: "Full time",
      },
      status: {
        type: String,
        enum: ["Open", "Close", "Interview", "Offered"],
        default: "Open",
      },
      skills: [String],
    },
    { timestamps: true },
    {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",          // 👈 your users collection
        required: true,
      }
    }
  )
);
