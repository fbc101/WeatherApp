import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const TimeTemperatureGraph = ({ data }) => {
  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Ensure height is set */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8">
            <LabelList dataKey="temperature" position="top" />
          </Area>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeTemperatureGraph;