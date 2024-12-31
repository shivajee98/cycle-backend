// src/controller/article.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Article } from "../models/article.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";

const postArticle = asyncHandler(async (req, res) => {
  const { title, paragraph } = req.body;

  // Check if user is authenticated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized: User not logged in");
  }

  // Check if title and paragraph are provided
  if (!title || !paragraph) {
    throw new ApiError(400, "Title and content are required");
  }

  // Create the article with the author's ID
  const article = await Article.create({
    title,
    paragraph,
    author: req.user._id, // Use `req.user._id` instead of `article._id`
  });

  // Add the newly created article to the author's article list
  await User.findByIdAndUpdate(req.user._id, {
    $push: { articles: article._id }, // The array field is `articles`, not `article`
  });

  // Fetch the created post with populated author details
  const createdPost = await Article.findById(article._id).populate('author', 'fullName username');

  if (!createdPost) {
    throw new ApiError(500, "Failed to create article");
  }

  return res.status(201).json(new ApiResponse(200, createdPost, "Article posted successfully"));
});

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'fullName username').exec(); // Fetch all articles with author details
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
};

const getSpecificArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    .populate('author', 'fullName') // Populate author's full name for the article
    .populate('comments.author', 'fullName'); // Populate fullName for each comment's author

    if (!article) throw new ApiError(404, "Post Not Found");
    res.json(article);
  } catch (error) {
    throw new ApiError(404, error.message || "Invalid Request");
  }
});

const getArticlesByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const articles = await Article.find({ author: authorId }); // Adjust field based on your schema
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

export { postArticle, getArticles, getSpecificArticle, getArticlesByAuthor };
