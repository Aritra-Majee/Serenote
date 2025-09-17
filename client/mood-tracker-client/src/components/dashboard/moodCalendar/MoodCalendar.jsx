import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from "react-tooltip";
import "./MoodCalendar.css";
import { useMood } from "../../../contexts/MoodContext";

function MoodCalendar() {

    const { moods, error } = useMood();

    const moodScore = (type) => {
        if (type === "Positive") return 2;
        if (type === "Negative") return -2;
        return 0;
    };

    const aggregatedData = moods.reduce((acc, mood) => {

        if (!acc[mood.date]) {
            acc[mood.date] = { date: mood.date, total: 0, count: 0, details: [] };
        }

        acc[mood.date].total += moodScore(mood.type);
        acc[mood.date].count += 1;
        acc[mood.date].details.push(`${mood.mood} : (${mood.note || "No note"})`);


        return acc;
    }, {})

    const heatmapData = Object.values(aggregatedData).map((d) => ({
        date: d.date,
        score: d.total / d.count,
        details: d.details,
    }));

    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);


    return (
        <>
            <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
                <h3 className="text-center">Mood Calendar (Past Year)</h3>
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={heatmapData}
                    classForValue={(value) => {
                        if (!value) return "color-empty";
                        if (value.score > 1.5) return "color-positive-very-high";
                        if (value.score >= 1) return "color-positive-high";
                        if (value.score > 0) return "color-positive-low";
                        if (value.score < -1.5) return "color-negative-very-high";
                        if (value.score <= -1) return "color-negative-high";
                        if (value.score < 0) return "color-negative-low";
                        return "color-neutral";

                    }}
                    tooltipDataAttrs={(value) => {
                        if (!value || !value.date) return null;
                        return {
                            "data-tooltip-id": "mood-tooltip",
                            "data-tooltip-html": `${value.date}:<br/>${(value.details || [])
                                .map(detail => `${detail},<br/>`)
                                .join("")}`,
                        };
                    }}
                // showWeekdayLabels
                />
                <Tooltip id="mood-tooltip" multiline   style={{
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: "8px",
    padding: "8px 10px",
    maxWidth: "250px",
    whiteSpace: "pre-line",
    overflowWrap: "break-word"
  }}/>
            </div>
        </>
    );
}

export default MoodCalendar;