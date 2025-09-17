const express = require("express");
const router = express.Router();
const {getMoods, createMood, updateMood, deleteMood} = require("../controllers/moodControllers");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route("/").get(getMoods).post(createMood);

// router.route("/:id").get((req,res)=> {
//     res.status(200).json({message : "Get all mood"});
// })


router.route("/:id").put(updateMood).delete(deleteMood);


module.exports = router;