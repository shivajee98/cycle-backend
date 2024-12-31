// backend middlewares/ownership.middleware.js
import { Article } from '../models/article.model.js'; // Assuming you have an Article model
import { User } from '../models/users.model.js';

const checkOwnership = async (req, res, next) => {
    try {
        const resourceType = req.route.path.includes('articles') ? 'article' : 'profile';

        let resource;

        // If it's an article, fetch the article based on the article ID
        if (resourceType === 'article') {
            const { id } = req.params; // Extract article ID from params
            resource = await Article.findById(id);

            if (!resource) {
                return res.status(404).json({ message: 'Article not found.' });
            }

            // Ensure the article is owned by the authenticated user
            if (resource.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'You do not have permission to modify this article.' });
            }

        // If it's a profile, check that the authenticated user is editing their own profile
        } else if (resourceType === 'profile') {
            resource = await User.findById(req.user._id); // Only use the authenticated user's ID

            if (!resource) {
                return res.status(404).json({ message: 'Profile not found.' });
            }

            // You don't need to check ownership here, as you are only allowing users to edit their own profile
        }

        next(); // Proceed if the user owns the resource
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

export default checkOwnership;
