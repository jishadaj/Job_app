import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute.js'
import PostRoute from './Routes/PostRoute.js'
import ApplicationRoute from './Routes/ApplicationRoute.js'

//Routes

const app = express();

//Middleware
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
mongoose.set('strictQuery', false);

dotenv.config()

// MongoDB configuration
mongoose.connect(
    process.env.MONGO_DB,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(
        () => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)
        )).catch((error) => console.log(error));


// usage of routes
app.use('/auth', AuthRoute)
app.use('/post', PostRoute)
app.use('/application', ApplicationRoute)