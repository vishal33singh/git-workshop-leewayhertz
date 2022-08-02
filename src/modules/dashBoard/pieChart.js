import * as React from "react";
import { PieChart, Pie, Cell } from "recharts";
const data = [
  { name: "Artist", value: 20 },
  { name: "Organiser", value: 40 },
  { name: "Promoter", value: 40 },
];
const COLORS = ["#333333", "#395FF1", "#FF6142"];
export default function PieCharts() {
  return (
    <div>
      <PieChart width={200} height={200}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          startAngle={90}
          endAngle={450}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={45}
          paddingAngle={0}
          label={false}
          stroke=""
          margin={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
