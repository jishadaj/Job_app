import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

// Mongoose schema for job application

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: ObjectId,
    ref: 'Job'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  resume: {
    data: { type: Buffer },
    contentType: { type: String, required: true }
  },
  cover_letter: {
    data: { type: Buffer },
    contentType: { type: String, required: true },
    format: { type: String, default: 'markdown' }
  }
});

const ApplicationModel = mongoose.model('Application', jobApplicationSchema);

export default ApplicationModel;