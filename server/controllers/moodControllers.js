const asyncHanlder = require("express-async-handler");
const MoodLog = require("../models/moodLogModel")
const moment = require("moment-timezone");

//desc Get all moods
//@route Get /api/moods
//@access private

const getMoods = asyncHanlder(async (req, res) => {
    const logs = await MoodLog.find({ user_id: req.user.id }).sort({ timestamp: -1 });
    res.status(200).json(logs);
});


//desc Create a moods
//@route Post /api/moods
//@access private
const createMood = asyncHanlder(async (req, res) => {

    console.log("The request body is:", req.body);
    console.log("req.user:", req.user);

    const { mood, type, note, dateObj } = req.body;
    if (!mood || !type) {
        res.status(400);
        throw new Error("Required Fields can't be empty !!");
    }

    const formattedDate = dateObj.split("T")[0];

    const time = dateObj;


    const log = await MoodLog.create({
        user_id: req.user.id,
        mood,
        type,
        note,
        date: formattedDate,
        timestamp: time
    });

    console.log("Mood added:", log);


    res.status(200).json(log);
});



//desc Update a mood
//@route Put /api/moods/:id
//@access private
const updateMood = asyncHanlder(async (req, res) => {
    const mood = await MoodLog.findById(req.params.id);

    if (!mood) {
        res.status(404);
        throw new Error("Mood not found");
    }


    if (mood.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to update this mood");
    }

    const updatedMood = await MoodLog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json(updatedMood);
});


//desc Delete a mood
//@route Delete /api/moods/:id
//@access private
const deleteMood = asyncHanlder(async (req, res) => {

    const mood = await MoodLog.findById(req.params.id);

    if (!mood) {
        res.status(404);
        throw new Error("Mood not found");
    }


    if (mood.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to delete this mood");
    }

    await mood.deleteOne();

    res.status(200).json({ message: `Mood ${req.params.id} deleted` });
});

module.exports = { getMoods, createMood, updateMood, deleteMood };