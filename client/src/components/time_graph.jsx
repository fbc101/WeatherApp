import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const TimeTemperatureGraph = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '100px'}}> 
      <ResponsiveContainer >
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="temperature" stroke="#FAB200" fill="#FFCC02">
            <LabelList
                dataKey="temperature"
                position="top"
                fontSize={12}
                content={(props) => {
                const { x, y, index, value } = props;
                return index != 0 && index % 3 === 0 ? (
                    <text x={x} y={y} dy={-5} fontSize={12} fill="#333" textAnchor="middle">
                    {value}
                    </text>
                ) : null;
                }}
            />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeTemperatureGraph;