import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary
import './config/passport.js'; // Passport config
import userRouter from './routes/article.router.js';
import searchRouter from './routes/searchRouter.router.js';
import paymentRouter from './routes/payment.router.js';
import authRouter from './routes/auth.router.js';


const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Basic middlewares setup
app.use(cors({
    origin: ['http://localhost:5173'], // Your frontend origin
    credentials: true // Allow credentials (cookies, etc.)
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Initialize session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/auth", authRouter); // Use the auth routes
app.use("/api/start", userRouter); 
app.use("/api/search", searchRouter); 
app.use("/api/end", paymentRouter); 

export { app };
