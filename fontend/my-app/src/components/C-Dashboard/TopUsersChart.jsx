import React, { useEffect, useState } from "react";
import { getTopUsersByMonth } from "../../services/searchHistoryService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const TopUsersChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getTopUsersByMonth(year);
        // Map dữ liệu cho chart: mỗi user 1 label
        const chartData = result.map((user) => ({
          name: `User ${user.userId}`,
          totalSearches: user.totalSearches,
        }));
        setTopUsers(chartData);
      } catch (err) {
        setError("Lấy dữ liệu thất bại");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Top 10 người dùng tìm nhiều nhất</h2>

      <div style={{ marginBottom: "16px" }}>
        <label htmlFor="year">Chọn năm: </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min="2000"
          max={new Date().getFullYear()}
          style={{ padding: "4px 8px", width: "100px" }}
        />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && topUsers.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topUsers} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSearches" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      )}

      {!loading && !error && topUsers.length === 0 && <p>Không có dữ liệu</p>}
    </div>
  );
};

export default TopUsersChart;
