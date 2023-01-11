import express from 'express'
import { getAllJob, getJob, postingJob } from '../Controllers/PostController.js';

const router = express.Router()

router.post('/jobposting', postingJob)
router.get('/getalljob', getAllJob)
router.get('/getjob/:id', getJob)


export default router;