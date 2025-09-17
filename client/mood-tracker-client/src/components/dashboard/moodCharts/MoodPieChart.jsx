import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function MoodPieChart({moods}) {
    
  const counts = { Positive: 0, Negative: 0, Neutral: 0 };

  moods.forEach((mood) => {
    if (mood.type === "Positive") counts.Positive++;
    else if (mood.type === "Negative") counts.Negative++;
    else counts.Neutral++;
  });

  const data = [
    { name: "Positive", value: counts.Positive },
    { name: "Negative", value: counts.Negative },
    { name: "Neutral", value: counts.Neutral },
  ];


  const COLORS = ["#34d399", "#f87171", "#a5b4fc"];

  const filteredData = data.filter(item => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={filteredData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default MoodPieChart;
