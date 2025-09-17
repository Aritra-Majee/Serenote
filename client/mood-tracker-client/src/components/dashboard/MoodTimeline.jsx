import { useEffect, useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaSmile, FaSadTear, FaDotCircle } from "react-icons/fa";
import { useMood } from "../../contexts/MoodContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useAxiosInstance } from "../../api/axiosInstance";


const apiUrl = import.meta.env.VITE_API_URL;

function MoodTimeline() {
    const token = localStorage.getItem("accessToken");
    const { moods, error, refetch } = useMood();
    const axiosInstance = useAxiosInstance();

    function getDetails(mood) {
        const map = {
            Happy: "😊 Happy",
            Excited: "🤩 Excited",
            Grateful: "🙏 Grateful",
            Content: "😌 Content",
            Motivated: "💪 Motivated",
            Loved: "❤️ Loved",
            Hopeful: "🌈 Hopeful",
            Supported: "🤝 Supported",

            Sad: "😔 Sad",
            Angry: "😡 Angry",
            Anxious: "😰 Anxious",
            Tired: "😩 Tired",
            Stressed: "😫 Stressed",
            Lonely: "😞 Lonely",
            Frustrated: "😤 Frustrated",
            Overwhelmed: "😵 Overwhelmed",
            Rejected: "🙁 Rejected",
            Confused: "😕 Confused",
            Guilty: "😓 Guilty",

            Neutral: "😐 Neutral",
            Bored: "😑 Bored",
            Other: "✍️ Other (Custom)",
        };

        return map[mood] || "🙂 Unknown";
    }

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This mood entry will be deleted permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirm.isConfirmed) {
            try {
                // const res = await axios.delete(
                //     `${apiUrl}/api/moods/${id}`, {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     }
                // });

                const res = await axiosInstance.delete(`/api/moods/${id}`);


                Swal.fire("Deleted!", "Your mood has been removed.", "success");
                refetch();
            } catch (err) {
                const message = err.response?.data?.message || "Unable to delete mood.";

                Swal.fire("Error!", message, "error");
            }
        }
    };

    const moodOptions = [
        // Positive moods
        { value: "Happy", type: "Positive" },
        { value: "Excited", type: "Positive" },
        { value: "Grateful", type: "Positive" },
        { value: "Content", type: "Positive" },
        { value: "Motivated", type: "Positive" },
        { value: "Loved", type: "Positive" },
        { value: "Hopeful", type: "Positive" },
        { value: "Supported", type: "Positive" },

        // Negative moods
        { value: "Sad", type: "Negative" },
        { value: "Angry", type: "Negative" },
        { value: "Anxious", type: "Negative" },
        { value: "Tired", type: "Negative" },
        { value: "Stressed", type: "Negative" },
        { value: "Lonely", type: "Negative" },
        { value: "Frustrated", type: "Negative" },
        { value: "Overwhelmed", type: "Negative" },
        { value: "Rejected", type: "Negative" },
        { value: "Confused", type: "Negative" },
        { value: "Guilty", type: "Negative" },

        // Neutral / Other moods
        { value: "Neutral", type: "Neutral/Other" },
        { value: "Bored", type: "Neutral/Other" },
        { value: "Other", type: "Neutral/Other" },
    ];


    const handleUpdate = async (entry) => {

        const optionsHtml = moodOptions
            .map(({ value }) =>
                `<option value="${value}" ${entry.mood === value ? "selected" : ""}>
        ${getDetails(value)}
      </option>`
            )
            .join("");

        const { value: formValues } = await Swal.fire({
            title: "Update Mood",
            html: `
      <select id="swal-mood" class="swal2-input">${optionsHtml}</select>
      <textarea id="swal-note" class="swal2-textarea" placeholder="Enter note">${entry.note || ""}</textarea>
    `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Update",
            preConfirm: () => {
                const selectedMood = document.getElementById("swal-mood").value;
                const selectedOption = moodOptions.find(m => m.value === selectedMood);

                return {
                    mood: selectedMood,
                    type: selectedOption.type,
                    note: document.getElementById("swal-note").value
                };
            }
        });

        if (formValues) {
            try {
                // const res = await axios.put(
                //     `${apiUrl}/api/moods/${entry._id}`,
                //     {
                //         mood: formValues.mood,
                //         type: formValues.type,
                //         note: formValues.note,
                //     },
                //     {
                //         headers: {
                //             "Content-Type": "application/json",
                //             Authorization: `Bearer ${token}`,
                //         },
                //     }
                // );

                const res = await axiosInstance.put(`/api/moods/${entry._id}`, {
                    mood: formValues.mood,
                    type: formValues.type,
                    note: formValues.note,
                });


                Swal.fire("Updated!", "Your mood entry has been updated.", "success");
                refetch();
            } catch (error) {
                Swal.fire("Error!", "Unable to update mood.", "error");
            }
        }
    };


    return (
        <>
            <div
                className="my-5 mx-auto border rounded"
                style={{ maxHeight: "100vh", overflowY: "auto", width: "80%" }}
            >
                <h4 className="mt-5 mb-3 text-center">🕒 Mood Timeline</h4>

                {error ? <p className="text-center text-danger">{error}</p>
                    : moods.length === 0 ? (
                        <p className="text-center text-muted">No moods logged yet.</p>
                    ) : (
                        <VerticalTimeline>
                            {moods.map((entry) => {
                                const label = getDetails(entry.mood);
                                return (
                                    <VerticalTimelineElement
                                        key={entry._id}
                                        date={
                                            entry.timestamp
                                                ? new Date(entry.timestamp).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })
                                                : new Date(entry.createdAt).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })
                                        }
                                        icon={
                                            entry.type === "Positive" ? (
                                                <FaSmile />
                                            ) : entry.type === "Negative" ? (
                                                <FaSadTear />
                                            ) : (
                                                <FaDotCircle />
                                            )
                                        }
                                        iconStyle={{
                                            background:
                                                entry.type === "Positive"
                                                    ? "#34d399"
                                                    : entry.type === "Negative"
                                                        ? "#f87171"
                                                        : "#a5b4fc",
                                            color: "#fff",
                                        }}
                                        contentStyle={{
                                            background: "#f9fafb",
                                            color: "#111",
                                            borderTop: `4px solid ${entry.type === "Positive"
                                                ? "#34d399"
                                                : entry.type === "Negative"
                                                    ? "#f87171"
                                                    : "#a5b4fc"
                                                }`,
                                        }}
                                    >
                                        <h5 className="mb-1">{label}</h5>
                                        <p style={{ overflowWrap: "break-word", whiteSpace: "normal" }}>{entry.note}</p>

                                        <div className="d-flex gap-2 mt-2">
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleUpdate(entry)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(entry._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </VerticalTimelineElement>
                                );
                            })}
                        </VerticalTimeline>
                    )}


            </div>
        </>
    );
}

export default MoodTimeline;
