const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`User created ${user}`);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All field are mandatory!");
    }

    const user = await User.findOne({ email });

    if (user && await (bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const options = {
            httpOnly : true,
            secure : false,
            sameSite: "lax",
            // path : "/api/users/refresh"
        }

        // res.cookie("refreshToken", refreshToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "None",
        //     maxAge: 7 * 24 * 60 * 60 * 1000 
        // });

        res.status(200).cookie("refreshToken",refreshToken,options).json({ accessToken, refreshToken });
    }
    else {
        res.status(401);
        throw new Error("Email or Password is not valid")
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


//@desc Generate new access token using refresh token
//@route POST /api/users/refresh
//@access public
const refreshToken = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    // Check header and format
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Refresh token missing" });
    }
    
    const token = authHeader.split(" ")[1];
    // const token = req.cookies.refreshToken;
    // console.log("Attention :::::: ",req.cookies.refreshToken);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );

        res.status(200).json({ accessToken });
    });
});

//@desc Login user and set refresh token cookie
//@route POST /api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
});


module.exports = { registerUser, loginUser, currentUser, refreshToken, logoutUser }