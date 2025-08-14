import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./lineChart.module.scss";
import { useTheme } from "next-themes";

type DataPoint = {
  label: string;
  value: number;
};

type Props = {
  data: DataPoint[];
  tooltipLabel?: string;
  height?: number;
  chartTitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  className?: string;
};

const CustomTooltip = ({ active, payload, label, preFixText = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>
          {preFixText} {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const LineChart: React.FC<Props> = ({
  data,
  tooltipLabel = "",
  chartTitle,
  xAxisLabel,
  yAxisLabel,
  className,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const primaryColor = "#9249e7";

  return (
      <div
        className={`${styles.chartWrapper} ${
          isDark ? styles.dark : ""
        } ${className}`}
      >
      {chartTitle && <div className={styles.chartTitle}>{chartTitle}</div>}
        {/* {chartTitle && <div className={styles.chartTitle}>{chartTitle}</div>} */}
        <ResponsiveContainer
          width="100%"
          className={`${styles.chart_container}`}
        >
          <ReLineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              bottom: xAxisLabel ? 50 : 20,
              left: yAxisLabel ? 0 : 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#334155" : "#e5e7eb"}
            />
            <XAxis
              dataKey="label"
              stroke={isDark ? "#E2E8F0" : "#0F172A"}
              tick={{ className: styles.axisTick }}
              tickSize={12}
              label={
                xAxisLabel
                  ? {
                      value: xAxisLabel,
                      position: "insideBottom",
                      offset: -30,
                      style: {
                        textAnchor: "middle", // <== centers the label
                      },
                      className: styles.axisLabel,
                    }
                  : undefined
              }
            />
            <YAxis
              stroke={isDark ? "#E2E8F0" : "#0F172A"}
              tick={{ className: styles.axisTick }}
              tickSize={12}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      offset: 20,
                      style: {
                        textAnchor: "middle", // <== centers the label
                      },
                      className: styles.axisLabel,
                    }
                  : undefined
              }
            />
            <Tooltip content={<CustomTooltip preFixText={tooltipLabel} />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={primaryColor}
              strokeWidth={3}
              dot={{ r: 5, fill: primaryColor }}
              activeDot={{ r: 8, fill: primaryColor }}
            />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
  );
};

export default LineChart;
