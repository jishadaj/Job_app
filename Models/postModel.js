import mongoose from "mongoose";

// Mongoose schema for job posting
const jobPostingSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    skills: { 
        type: Array, 
        required: true 
    },
    experience: { 
        type: String, 
        required: true 
    }
});

const PostModel = mongoose.model('JobPosting', jobPostingSchema);

export default PostModel;
