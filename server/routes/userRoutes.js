const express = require("express");
const { registerUser, loginUser, currentUser, refreshToken, logoutUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken, currentUser)

router.post("/refresh", refreshToken)

router.post("/logout", logoutUser);


module.exports = router;