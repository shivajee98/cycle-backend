import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import dotenv from 'dotenv';
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://googleapitesting.zapto.org/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // Update tokens if user exists
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
        } else {
          // Generate unique username
          let username = profile.displayName;
          let existingUser = await User.findOne({ username });

          let counter = 1;
          while (existingUser) {
            // Modify username to make it unique
            username = `${profile.displayName} (${counter})`;
            existingUser = await User.findOne({ username });
            counter++;
          }

          // Create new user with unique username
          user = await User.create({
            googleId: profile.id,
            username: username,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            fullName: profile.displayName,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }

        done(null, user); // Pass the user object to Passport
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
