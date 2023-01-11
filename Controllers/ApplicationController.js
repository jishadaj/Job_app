import ApplicationModel from '../Models/applicationModel.js'
import PostModel from '../Models/postModel.js';
import multer from 'multer';

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
// const upload = multer({ storage });


export const jobApplication = async (req, res) => {
    //const { id } = req.params;
    console.log(req.files);
    const { id, name, email } = req.body;
    const resume = req.files['resume'][0];
    const coverLetter = req.files['cover_letter'][0];

    // create new application
    const newApplication = new ApplicationModel({
        job: id,
        name: name,
        email: email,
        resume: {
            data: resume.buffer,
            contentType: resume.mimetype
        },
        cover_letter: {
            data: coverLetter.buffer,
            contentType: coverLetter.mimetype,
            format: 'markdown'
        },
    });

    // save the application
    newApplication.save()
        .then(application => {
            res.json({ message: 'Application submitted successfully', application });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error submitting application', error: err });
        });
};


// Get job application
export const getJobApplication = async (req, res) => {
    try {
        const job = await PostModel.findOne({ _id: req.params.id });
        if (!job) return res.status(404).send('Job not found');

        const applications = await ApplicationModel.find({ job: req.params.jobId });
        const results = applications.map(app => {
            return {
                name: app.name,
                email: app.email,
                cover_Letter: app.cover_Letter
            }
        });
        res.send(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};