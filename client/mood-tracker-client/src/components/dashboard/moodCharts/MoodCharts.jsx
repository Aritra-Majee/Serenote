import MoodAreaChart from "./MoodAreaChart";
import MoodBarChart from "./MoodBarChart";
import MoodLineChart from "./MoodLineChart";
import MoodPieChart from "./MoodPieChart";
import { useMood } from "../../../contexts/MoodContext";
import "./MoodCharts.css"

function MoodCharts() {

    const { moods, error } = useMood();

    const moodScore = (type) => {
        if (type === "Positive") return 2;
        if (type === "Negative") return -2;
        return 0;
    };

    const aggregatedData = moods.reduce((acc, mood) => {

        if (!acc[mood.date]) {
            acc[mood.date] = { date: mood.date, total: 0, count: 0 };
        }

        acc[mood.date].total += moodScore(mood.type);
        acc[mood.date].count += 1;

        return acc;
    }, {})

    const graphData = Object.values(aggregatedData).map((d) => ({
        date: d.date,
        score: parseFloat((d.total / d.count).toFixed(2))
    }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(aggregatedData);


    return (
        <>
            <div
                className="my-5 mx-auto border rounded"
                style={{ width: "80%", height: "600" }}
            >


                <section className="offerings-section">
                    <div className="container">
                        <h2 className="section-title">Mood Analytics</h2>
                        <br />
                        {error ? <p className="text-center text-danger">{error}</p>
                            :
                            moods.length === 0 ? (
                                <p className="text-center text-muted">No moods logged yet.</p>
                            ) : (
                                <div className="mood-offerings-grid">
                                    <div className="offering-card">
                                        <span className="offering-number">01.</span>
                                        <h3>Last 7 days</h3>
                                        <MoodBarChart graphData={graphData.slice(-7)} />
                                    </div>

                                    <div className="offering-card">
                                        <span className="offering-number">02.</span>
                                        <h3>Last 30 days</h3>
                                        <MoodAreaChart graphData={graphData.slice(-30)} />
                                    </div>

                                    <div className="offering-card">
                                        <span className="offering-number">03.</span>
                                        <h3>Last 365 days</h3>
                                        <MoodLineChart graphData={graphData.slice(-365)} />
                                    </div>

                                    <div className="offering-card">
                                        <span className="offering-number">04.</span>
                                        <h3>Pie Chart</h3>
                                        <MoodPieChart moods={moods} />
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            </div>

        </>
    );



}

export default MoodCharts