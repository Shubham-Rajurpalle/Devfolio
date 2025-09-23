import mongoose from "mongoose";

const DemoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["appetize", "snack", "youtube", "none"],
    required: true,
  },
  url: String,
});

const ContactSchema = new mongoose.Schema({
  email: String,
  linkedin: String,
  github: String,
  phone: String,
});

const ResumeSchema = new mongoose.Schema({
  url: String,
  filename: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  role: String,
  short: String,
  description: String,
  tech: [String],
  highlights: [String],
  cover: String,
  demo: DemoSchema,
  repo: String,
  liveUrl: String,
  featured: Boolean,
  duration: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  location: String,
  contact: ContactSchema,
  resume: ResumeSchema,
  skills: [String],
  experience: [
    {
      company: String,
      role: String,
      duration: String,
      description: [String],
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      cgpa: String,
      year: String,
    },
  ],
  achievements: [String],
  stats: {
    gfgProblems: String,
    maxRating: String,
    rank: String,
    youtubeSubscribers: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project = mongoose.model("Project", ProjectSchema);
export const Profile = mongoose.model("Profile", ProfileSchema);
export default Project;
