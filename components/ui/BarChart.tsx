
import React from 'react';

interface ChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.ceil(Math.max(...data.map(d => d.value), 0) / 5) * 5 || 5;
  const chartHeight = 250;
  const barWidth = 50;
  const chartWidth = data.length * barWidth;
  const xAxisLabelHeight = 100;

  const yScale = (value: number) => chartHeight - (value / maxValue) * chartHeight;

  const renderYAxis = () => {
    const tickCount = 5;
    return Array.from({ length: tickCount + 1 }).map((_, i) => {
      const tickValue = (maxValue / tickCount) * i;
      if (tickValue < 0) return null;
      const y = yScale(tickValue);
      return (
        <g key={i} className="text-slate-400 text-xs">
          <line
            x1={0}
            x2={chartWidth}
            y1={y}
            y2={y}
            stroke="currentColor"
            strokeDasharray="2,2"
            strokeWidth="1"
          />
          <text x="-8" y={y + 4} textAnchor="end" className="fill-slate-500">
            {Math.round(tickValue)}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden pb-4 -ml-10 pr-4">
      <svg
        width={chartWidth < 200 ? 200 : chartWidth}
        height={chartHeight + xAxisLabelHeight}
        className="font-sans"
      >
        <g transform={`translate(40, 10)`}>
          {renderYAxis()}
          {data.map((d, i) => {
            const barHeight = chartHeight - yScale(d.value);
            const x = i * barWidth;
            const effectiveBarWidth = barWidth * 0.6;

            return (
              <g key={d.name} className="group">
                <title>{`${d.name}: ${d.value}`}</title>
                <rect
                  x={x + (barWidth * 0.2)}
                  y={yScale(d.value)}
                  width={effectiveBarWidth}
                  height={barHeight > 0 ? barHeight : 0}
                  className="fill-indigo-500 transition-all duration-300 group-hover:fill-indigo-600"
                  rx="3"
                />
                <text
                  x={x + barWidth / 2}
                  y={yScale(d.value) - 8}
                  textAnchor="middle"
                  className="text-sm font-bold fill-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {d.value}
                </text>
                <text
                  transform={`translate(${x + barWidth / 2}, ${chartHeight + 10}) rotate(-45)`}
                  textAnchor="end"
                  className="text-xs fill-slate-600"
                >
                  {d.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
