import express from 'express';
import { uploadImage } from '../controllers/analysisController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('image'), uploadImage);

export default router;