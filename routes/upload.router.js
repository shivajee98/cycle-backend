// src/routes/upload.routes.js
import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { uploadVideo } from '../controllers/upload.controller.js';


const uploadRouter = express.Router();

// uploadRouter.post('/image', uploadImage);
uploadRouter.post('/', uploadVideo); // New route for video uploads


export default uploadRouter;