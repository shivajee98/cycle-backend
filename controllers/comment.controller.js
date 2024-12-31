// backend/controllers/comment.controller.js

import { Article } from "../models/article.model.js";
import { ApiError } from "../utils/ApiError.js"

export const addComment = async (req, res) => {
    const { content } = req.body;
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId).populate('comments.author', 'fullName'); // populate author fullName in comments
        if (!article) {
            throw new ApiError(404, "No Articles Found");
        }

        const newComment = {
            content,
            author: req.user._id, // The author is the logged-in user
        };

        article.comments.push(newComment);
        await article.save();

        // Populate the author's details in the last added comment
        await article.populate('comments.author', 'fullName');

        const addedComment = article.comments[article.comments.length - 1]; // get the newly added comment

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: addedComment, // send the populated comment
        });
    } catch (error) {
        throw new ApiError(401, error?.message || "Something went wrong while adding the comment");
    }
};
