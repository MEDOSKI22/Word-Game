import { getAllScoresFromDB, createScoreInDB } from "../services/scoresService.js"

export const getAllScores = async(req, res) => {
    try {
        const scores = await getAllScoresFromDB();
        return res.status(200).json({
            success: true,
            data: scores
        })
    } catch (error) {
        console.error('Error fetching scores:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to fetch scores'
        })
    }
}

export const createScore = async (req, res) => {
    try {
        const { playerName, score } = req.body;
        
        const newScore = await createScoreInDB(req.body);
        return res.status(201).json({
            success: true,
            message: "Score added successfully",
            data: newScore
        })
    } catch (error) {
        console.error('Error adding score:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to add score'
        })
    }
}
