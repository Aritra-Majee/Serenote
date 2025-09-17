import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function MoodLineChart({ graphData }) {

    return (<>
        {/* <ResponsiveContainer width="50%" height={300}>
                <LineChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
     */}

        <div>
            <h5 className="text-center mb-2">Last 365 Days</h5>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="score" stroke="#f87171" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>



    </>
    );
}

export default MoodLineChart;
