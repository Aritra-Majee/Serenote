import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function MoodBarChart({ graphData }) {

    return (
        <>

            {/* <ResponsiveContainer width="50%" height={300}>
                <BarChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                </BarChart>
            </ResponsiveContainer> */}

            <div>
                <h5 className="text-center mb-2">Last 7 Days</h5>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Bar dataKey="score" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </>

    );
}

export default MoodBarChart;
