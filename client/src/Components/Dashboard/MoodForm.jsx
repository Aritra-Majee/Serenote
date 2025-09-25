import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMood } from "../../Contexts/MoodContext";
import { useAuth } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useAxiosInstance } from "../../api/axiosInstance";
import toast from "react-hot-toast";



const apiUrl = import.meta.env.VITE_API_URL;

function MoodForm() {
    const { accessToken, logout } = useAuth();
    const axiosInstance = useAxiosInstance();



    const { refetch } = useMood();
    const [mood, setMood] = useState(null);
    const [note, setNote] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("accessToken");

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });

    const moodOptions = [
        {
            label: "Positive",
            options: [
                { value: "Happy", label: "😊 Happy", category: "Positive" },
                { value: "Excited", label: "🤩 Excited", category: "Positive" },
                { value: "Grateful", label: "🙏 Grateful", category: "Positive" },
                { value: "Content", label: "😌 Content", category: "Positive" },
                { value: "Motivated", label: "💪 Motivated", category: "Positive" },
                { value: "Loved", label: "❤️ Loved", category: "Positive" },
                { value: "Hopeful", label: "🌈 Hopeful", category: "Positive" },
                { value: "Supported", label: "🤝 Supported", category: "Positive" },
            ],
        },
        {
            label: "Negative",
            options: [
                { value: "Sad", label: "😔 Sad", category: "Negative" },
                { value: "Angry", label: "😡 Angry", category: "Negative" },
                { value: "Anxious", label: "😰 Anxious", category: "Negative" },
                { value: "Tired", label: "😩 Tired", category: "Negative" },
                { value: "Stressed", label: "😫 Stressed", category: "Negative" },
                { value: "Lonely", label: "😞 Lonely", category: "Negative" },
                { value: "Frustrated", label: "😤 Frustrated", category: "Negative" },
                { value: "Overwhelmed", label: "😵 Overwhelmed", category: "Negative" },
                { value: "Rejected", label: "🙁 Rejected", category: "Negative" },
                { value: "Confused", label: "😕 Confused", category: "Negative" },
                { value: "Guilty", label: "😓 Guilty", category: "Negative" },
            ],
        },
        {
            label: "Neutral/Other",
            options: [
                { value: "Neutral", label: "😐 Neutral", category: "Neutral/Other" },
                { value: "Bored", label: "😑 Bored", category: "Neutral/Other" },
                { value: "Other", label: "✍️ Other (Custom)", category: "Neutral/Other" },
            ],
        },
    ];


    const handleChange = (selectedOption) => {
        console.log(selectedOption);
        setMood(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!mood) {
            toast.error("Please select a mood.");
            setLoading(false);
            return;
        }

        const toLocalISOString = (date) => {
            const pad = (n) => n.toString().padStart(2, "0");
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        };

        try {

            // const res = await axios.post(
            //     `${apiUrl}/api/moods`,
            //     {
            //         mood: mood.value,
            //         type: mood.category,
            //         note,
            //         dateObj: dateTime
            //             ? toLocalISOString(new Date(dateTime))
            //             : toLocalISOString(new Date()),

            //     }, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`,
            //     }
            // }
            // )

            const res = await axiosInstance.post(
                `/api/moods`,
                {
                    mood: mood.value,
                    type: mood.category,
                    note,
                    dateObj: dateTime
                        ? toLocalISOString(new Date(dateTime))
                        : toLocalISOString(new Date()),
                }
            );

            setMood(null);
            setNote("");
            setDateTime("");
            toast.success("Mood saved");
            refetch();


        } catch (err) {
            setMood(null);
            setNote("");
            const message = err.response?.data?.message || "Unexpected error. Please try again.";
            // const message = "Unexpected error. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }

    }

    return <>
        <div className="d-flex justify-content-between align-items-center p-4 rounded shadow mb-5" style={{
            background: "linear-gradient(135deg,#3b82f6,#6366f1)",
            color: "white"
        }}>
            <div>
                <h2 className="mb-1">Hi</h2>
                <p className="mb-0">How are you feeling today?</p>
            </div>

            <div className="text-end">
                <p className="mb-1 fw-bold">{currentDate}</p>
            </div>
        </div>


        <div className="d-flex justify-content-center align-items-center">
            <form className="p-4 border rounded shadow w-100" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
                <h4 className="mb-4 text-center">Log Your Mood</h4>

                <div className="mb-3">
                    <label htmlFor="mood" className="form-label">Mood</label>
                    <Select
                        options={moodOptions}
                        value={mood}
                        onChange={handleChange}
                        placeholder="Search or select a mood..."
                        isClearable
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Note (optional)</label>
                    <textarea
                        className="form-control"
                        id="note"
                        name="note"
                        rows="3"
                        placeholder="Anything you want to add..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="datetime" className="form-label">Date & Time (optional)</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="datetime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                    </>
                ) : (
                    "Submit"
                )}</button>
            </form>
        </div>

    </>
}
export default MoodForm;
