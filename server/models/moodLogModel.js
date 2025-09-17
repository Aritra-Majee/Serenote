const mongoose = require("mongoose");

const moodLogSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    mood: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("MoodLog", moodLogSchema);