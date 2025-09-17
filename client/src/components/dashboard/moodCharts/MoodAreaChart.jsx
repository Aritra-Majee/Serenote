import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function MoodAreaChart({ graphData }) {

    return (
        <>
            {/* <ResponsiveContainer width="50%" height={300}>
                <AreaChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                </AreaChart>
            </ResponsiveContainer> */}



            <div>
                <h5 className="text-center mb-2">Last 30 Days</h5>
                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Area type="monotone" dataKey="score" stroke="#34d399" fill="#a7f3d0" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default MoodAreaChart;
