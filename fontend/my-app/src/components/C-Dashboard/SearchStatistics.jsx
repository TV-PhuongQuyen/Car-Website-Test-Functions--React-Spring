import React, { useEffect, useState } from "react";
import { getSearchStatistics } from "../../services/searchHistoryService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const SearchStatistics = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(year, month);
    }, [year, month]);

    const fetchData = async (year, month) => {
        try {
            setLoading(true);
            const result = await getSearchStatistics(year, month);
            if (result && result.length > 0) {
                const monthData = result.find((item) => item.label === `${month}/${year}`);
                if (monthData) setData(monthData.hours);
                else setData([]);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu thống kê:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                Thống kê lượt tìm kiếm theo giờ
            </h2>

            {/* Bộ lọc tháng/năm */}
            <div className="flex justify-center gap-4 mb-6">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Tháng:</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="border rounded-lg px-3 py-2"
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Năm:</label>
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border rounded-lg px-3 py-2"
                    >
                        {[2024, 2025, 2026].map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Biểu đồ */}
            {loading ? (
                <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
            ) : data.length === 0 ? (
                <p className="text-center text-gray-400">Không có dữ liệu cho tháng {month}/{year}</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" label={{ value: "Giờ trong ngày", position: "insideBottom", dy: 10 }} />
                        <YAxis label={{ value: "Số lượt tìm kiếm", angle: -90, position: "insideLeft" }} />
                        <Tooltip formatter={(value) => [`${value} lượt`, "Tổng"]} />
                        <Bar dataKey="count" fill="#3b82f6" barSize={30} radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default SearchStatistics;
