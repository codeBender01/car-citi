import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const monthsData = [
  { month: "Янв", views: 140 },
  { month: "Февр", views: 110 },
  { month: "Март", views: 210 },
  { month: "Апр", views: 115 },
  { month: "Май", views: 170 },
  { month: "Июнь", views: 135 },
  { month: "Июль", views: 180 },
  { month: "Авг", views: 190 },
  { month: "Сент", views: 130 },
  { month: "Октб", views: 210 },
  { month: "Нояб", views: 175 },
  { month: "Дек", views: 245 },
];

const ViewsChart = () => {
  const [selectedCar, setSelectedCar] = useState("Audi A3");
  const [selectedDate, setSelectedDate] = useState("15 days");

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary text-textPrimary font-dm font-bold text-[13px] px-3 py-1 rounded">
          {payload[0].value}
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#0C1002"
          className="font-dm text-[10px]"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomYAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#0C1002"
          className="font-dm text-[13px]"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-[630px] border border-grayBorder rounded-2xl bg-white p-[30px] font-dm">
      <div className="flex items-center justify-between mb-10">
        <h2 className="font-dm font-medium text-lg text-textPrimary">
          Просмотр страницы с авто
        </h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="text-textGray text-[15px] font-dm">
              Выберите авто
            </span>
            <Select value={selectedCar} onValueChange={setSelectedCar}>
              <SelectTrigger className="border-none shadow-none p-0 h-auto gap-2 w-auto focus:ring-0">
                <SelectValue className="text-textPrimary text-[15px] font-dm" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Audi A3">Audi A3</SelectItem>
                <SelectItem value="BMW X5">BMW X5</SelectItem>
                <SelectItem value="Mercedes C-Class">
                  Mercedes C-Class
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-textGray text-[15px] font-dm">Дата</span>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="border-none shadow-none p-0 h-auto gap-2 w-auto focus:ring-0">
                <SelectValue className="text-textPrimary text-[15px] font-dm" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="7 days">7 days</SelectItem>
                <SelectItem value="15 days">15 days</SelectItem>
                <SelectItem value="30 days">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={460}>
        <AreaChart
          data={monthsData}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#88BA00" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#88BA00" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="#E1E1E1"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={<CustomYAxisTick />}
            ticks={[0, 50, 100, 150, 200, 250, 300]}
            domain={[0, 300]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#88BA00",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#88BA00"
            strokeWidth={3}
            fill="url(#colorViews)"
            activeDot={{
              r: 4,
              fill: "#88BA00",
              stroke: "#88BA00",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewsChart;
