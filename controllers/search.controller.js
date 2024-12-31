import { Article } from '../models/article.model.js';
import { User } from '../models/users.model.js';

// Combined search function
export const search = async (query, userId) => {
    try {
        // Search for articles
        const articles = await Article.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { paragraph: { $regex: query, $options: 'i' } }
            ],
            userId: userId // Optionally filter by userId
        });

        // Search for users
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });

        // Return both results
        return { articles, users };
    } catch (error) {
        throw new Error('Error while searching');
    }
};
