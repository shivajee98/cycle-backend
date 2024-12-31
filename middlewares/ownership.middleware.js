// backend/middlewares/ownership.middleware.js
import { Article } from "../models/article.model.js";

const checkOwnership = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Ensure the logged-in user is the owner of the article
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this article" });
    }

    next(); // Proceed if ownership is validated
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default checkOwnership;
