import PostModel from "../Models/postModel.js";

//posting Job
export const postingJob = async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let email = req.body.email;
    let skills = req.body.skills.split(','); //expecting skills to be passed as CSV
    let experience = req.body.experience;

    const jobPosting = new PostModel({
        title,
        description,
        email,
        skills,
        experience
    });

    jobPosting.save()
        .then(data => {
            res.json({ status: "success", message: "job posting created" });
        })
        .catch(err => {
            res.json({ status: "error", message: err });
        });
};

//get all posted job
export const getAllJob = (req, res) => {
    const { skills, experience } = req.query; // skills and experience level are passed as query parameters

    // Find all jobs with the required skills and experience level
    PostModel.find({ skills: { $in: skills }, experience: { $gte: experience } })
        .then(jobs => {
            res.json(jobs);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error getting jobs', error: err });
        });
};

// Route to get the details of a specific job posting
export const getJob = (req, res) => {
    const { id } = req.params;
    console.log(id)

    // Find the job by ID
    PostModel.findById(id)
        .then(job => {
            res.json(job);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error getting job', error: err });
        });
};
