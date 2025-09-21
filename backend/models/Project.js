import mongoose from "mongoose";

const DemoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["appetize", "snack", "youtube", "none"],
    required: true,
  },
  url: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  role: String,
  short: String,
  tech: [String],
  highlights: [String],
  cover: String,
  demo: DemoSchema,
  repo: String,
  featured: Boolean,
});

export default mongoose.model("Project", ProjectSchema);
