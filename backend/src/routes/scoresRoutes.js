import express from 'express';
import { getAllScores, createScore } from '../controllers/scoresController.js';

const router = express.Router();

router.get('/', getAllScores);
router.post('/', createScore);

export default router;
