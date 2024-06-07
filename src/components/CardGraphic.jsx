import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './graphic.css';

// Donut Chart Component
const StatusDonutChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={150}
        innerRadius={70}  // Definindo innerRadius para criar o efeito de rosca
        fill="#8884d8"
        label
        dataKey="value"
      >
        {data && data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.name === 'Canceled' ? 'red' : COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `R$${value.toLocaleString('pt-BR')}`} />
      <Legend />
    </PieChart>
  );
};

// Custom Tooltip for Bar Chart
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-bar-tooltip">
        <p className="earning">Earnings</p>
        <p className="value">R${payload[0].value.toLocaleString('pt-BR')}</p>
      </div>
    );
  }

  return null;
};

// Bar Chart Component
const EarningsBarChart = ({ data }) => {
  return (
    <BarChart width={700} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[0, 10000]} tickFormatter={(value) => `R$${value.toLocaleString('pt-BR')}`} />
      <Tooltip content={<CustomBarTooltip />} />
      <Legend formatter={() => 'Ganhos'} />
      <Bar dataKey="earnings" name="Ganhos" fill="#8884d8" />
    </BarChart>
  );
};

// Main Graphics Component
const Graphics = ({ donutData, barData, showDonutChart = true, showBarChart = true }) => {
  return (
    <div className="graphics-container">
      <div className="charts-container">
        {showDonutChart && <StatusDonutChart data={donutData} />}
        {showBarChart && <EarningsBarChart data={barData} />}
      </div>
    </div>
  );
}

Graphics.propTypes = {
  donutData: PropTypes.array.isRequired,
  barData: PropTypes.array.isRequired,
  showDonutChart: PropTypes.bool,
  showBarChart: PropTypes.bool,
};

export default Graphics;
