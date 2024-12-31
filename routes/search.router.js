import express from "express";
import { search } from '../controllers/search.controller.js';

const router = express.Router();

// Combined search endpoint
router.get('/', async (req, res) => {
    const { query, userId } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required." });
    }

    try {
        const { articles, users } = await search(query, userId); // Use the combined search function
        res.status(200).json({ articles, users }); // Return both results
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error while searching' });
    }
});

export default router;
