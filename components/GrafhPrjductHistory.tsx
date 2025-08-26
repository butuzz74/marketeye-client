import React from "react";
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { ProductHistory } from "@/types/types";
import { formattedDate } from "@/utils/formattedDate";

const GraphProductHistory = ({ data }: { data: ProductHistory[] }) => {
    const chartData = data.reduce<{ price: number; date: string }[]>(
        (acc, item) => {
            const price = Number(item.price);
            if (!isNaN(price)) {
                acc.push({
                    price,
                    date: formattedDate(item.date),
                });
            }
            return acc;
        },
        []
    );

    if (chartData.length === 0) {
        return (
            <p className="text-center text-red-700 bg-gray-100 p-4 rounded-lg shadow-sm text-2xl font-semibold">
                Цены на данный товар предоставляются по запросу!
            </p>
        );
    }
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { price, date } = payload[0].payload;
            return (
                <div className="bg-white p-2 border rounded shadow text-gray-700">
                    <p>Цена: {price}</p>
                    <p>Дата: {date}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                    dataKey="price"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GraphProductHistory;
