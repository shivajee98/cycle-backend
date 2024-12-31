// controllers/user.controller.js
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js"

export const start = async (req, res) => {
  const { fullName, email, phoneNumber, address, cycles, security, timestamp } = req.body;
  console.log(req.body);

  // Ensure all required fields are provided
  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !address ||
    !cycles ||
    typeof cycles !== 'object' ||
    Array.isArray(cycles) ||
    Object.keys(cycles).length === 0 ||
    !security ||
    !timestamp
  ) {
    throw new ApiError(400, "All User Details are required, and cycles must be an object with at least one key-value pair.");
  }

  // Convert and validate `phoneNumber` and `security`
  const phoneNumberNumber = Number(phoneNumber);
  const securityNumber = Number(security);

  if (isNaN(phoneNumberNumber) || isNaN(securityNumber)) {
    throw new ApiError(400, "Phone number and security must be valid numbers.");
  }

  // Validate that `cycles` contains valid key-value pairs
  for (const [key, value] of Object.entries(cycles)) {
    if (typeof value !== 'number') {
      throw new ApiError(400, `Invalid value for ${key}. The value must be a number.`);
    }
  }

  // Convert and validate `timestamp`
  const startTime = new Date(timestamp);
  if (isNaN(startTime.getTime())) {
    throw new ApiError(400, "Invalid timestamp format.");
  }

  try {
    // Create the user
    const user = await User.create({
      fullName,
      email,
      phoneNumber: phoneNumberNumber,
      address,
      cycles,
      security: securityNumber,
      startTime,
    });

    // Respond with the created user
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new ApiError(500, "Error creating user");
  }
};


export const end = async (req, res) => {
  try {
    const { phoneNumber, security, endTime } = req.body;
    console.log(req.body);
    

    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const startTime = new Date(user.startTime);
    const end = new Date(endTime);

    if (isNaN(startTime.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid timestamp format." });
    }

    const timeDifferenceInMs = end - startTime;
    if (timeDifferenceInMs < 0) {
      return res.status(400).json({ success: false, message: "End time cannot be before start time." });
    }

    const timeUsedInHours = timeDifferenceInMs / (1000 * 60 * 60);

    const cycles = user.cycles;
    let totalPrice = 0;
    const pricePerCycleType = {
      "bicycle type 1": 30,
      "bicycle type 2": 40,
      "bicycle type 3": 50
    };

    for (const [cycleType, count] of Object.entries(cycles)) {
      if (pricePerCycleType[cycleType]) {
        const cyclePrice = (pricePerCycleType[cycleType] / 30) * timeUsedInHours * count;
        totalPrice += cyclePrice;
      }
    }

    const remainingBalance = security - totalPrice;
    console.log(remainingBalance);
    

    if (remainingBalance < 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
        remainingBalance,
      });
    }

    res.status(200).json({
      success: true,
      totalPrice,
      remainingBalance,             
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Fetch all users from the database
export const getAllUsers = async (req, res) => {
  try {
    // Query the database to get all users
    const users = await User.find();  // This assumes you're using Mongoose and have the User model set up

    // If no users are found, send a message
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found.",
      });
    }

    // Return the list of users
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    // Catch any error that occurs and respond with a message
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users.",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { query } = req.query; // Extract the search query

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required.',
      });
    }

    const queryNumber = Number(query); // Convert the query to a number
    if (isNaN(queryNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Query must be a valid number.',
      });
    }

    // Perform exact match search
    const users = await User.find({ phoneNumber: queryNumber });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No users found.',
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching users.',
    });
  }
};



// const generateTokens = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     if (!user) throw new ApiError(404, "User not found");

//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     // Optionally save the refresh token in the database if needed
//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(500, "Something went wrong while generating Tokens");
//   }
// };

// export const handleAuthCallback = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const tokens = await generateTokens(user._id); // Ensure to await the promise

//     // Send tokens to the client
//     res.json({
//       success: true,
//       tokens,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
