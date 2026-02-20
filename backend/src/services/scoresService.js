import { pool } from "../config/db.js"

export const createScoreInDB = async (data) => {
    const {playerName, score} = data;

    const result = await pool.query(
        `INSERT INTO leaderboard(player_name, score) VALUES($1, $2) RETURNING *`, 
        [playerName, score]
    );
    
    return result.rows[0];
}

export const getAllScoresFromDB = async () => {
    const results = await pool.query(
        `SELECT id, player_name, score, created_at FROM leaderboard ORDER BY score DESC LIMIT 10`
    );

    return results.rows;
}
