import express from 'express'
import multer from 'multer';
import { getJobApplication, jobApplication } from '../Controllers/ApplicationController.js';

const router = express.Router()

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// const storage = multer.diskStorage({
//     destination : (req, file, cb) =>{
//         cb(null, "Public/Files");
//     },
//     filename: (req, file, cb) =>{
//         cb(null, req.body.name)
//     }
// });

// const upload = multer({storage: storage})

router.post('/:id/jobapply', upload.fields([{ name: 'resume' }, { name: 'cover_letter' }]), jobApplication)
router.get('/id/getapplication', getJobApplication)

export default router;