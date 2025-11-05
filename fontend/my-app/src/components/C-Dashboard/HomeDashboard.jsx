import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getTotalPosts } from "../../services/postService";
import { getTotalUsers } from "../../services/authService";
import { getTotalProducts } from "../../services/productService";
import { getSearchStatistics } from "../../services/searchHistoryService";
export default function DashboardAdmin() {
    const chartRef = useRef(null); // dùng ref để quản lý chart instance
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [getProducts, setTotalProduct] = useState(0);
    const year = new Date().getFullYear();
    useEffect(() => {
        loadChartData();
    }, [month]); // mỗi khi đổi tháng gọi lại
    useEffect(() => {
        getTotalPosts().then(setTotalPosts).catch(console.error);
        getTotalUsers().then(setTotalUsers).catch(console.error);
        getTotalProducts().then(setTotalProduct).catch(console.error);

    }, []);
    const loadChartData = async () => {
        try {
            const res = await getSearchStatistics(year, month);
            console.log("📌 API trả về:", res);
            ;

            const monthData = res.find(item => item.label === `${month}/${year}`);
            console.log("📌 monthData:", monthData);

            if (monthData) {
                const labels = monthData.hours.map(x => x.hour);
                const counts = monthData.hours.map(x => x.count);
                console.log("📌 labels:", labels, "counts:", counts);
                buildChart({ labels, counts });
            } else {
                console.log("⚠️ Không tìm thấy dữ liệu cho tháng này!");
                buildChart({ labels: [], counts: [] });
            }
        } catch (e) {
            console.error(e);
        }
    };



    const buildChart = (data) => {
        const ctx = document.getElementById("recentMovementChart");
        if (chartRef.current) chartRef.current.destroy();

        chartRef.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Search count",
                    data: data.counts,
                    borderColor: "#3B82F6",
                    backgroundColor: "rgba(59, 130, 246, 0.2)",
                    tension: 0.4,
                    fill: true,
                }],
            },
            options: {
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
            },
        });
    };

    return (
        <div className="container-fluid p-4 bg-dark text-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-white">HOME</h3>
            </div>

            {/* Row 1: Stats Cards */}
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card bg-secondary border-0 text-white">
                        <div className="card-body">
                            <h6>{totalUsers.message}</h6>
                            <h3>{totalUsers.result}</h3>
                            <p className="text-info small">-3.65% Since last week</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-secondary border-0 text-white">
                        <div className="card-body">
                            <h6>{getProducts.message}</h6>
                            <h3>{getProducts.result}</h3>
                            <p className="text-success small">+6.65% Since last week</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-secondary border-0 text-white">
                        <div className="card-body">
                            <h6>Visitors</h6>
                            <h3>14,212</h3>
                            <p className="text-success small">+5.25% Since last week</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card bg-secondary border-0 text-white">
                        <div className="card-body">
                            <h6>Tổng bài viết</h6>
                            <h3>{totalPosts}</h3>
                            <p className="text-danger small">-2.25% Since last week</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Chart + Other widgets */}
            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="card bg-secondary border-0 text-white">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Recent Movement</h6>
                            <select
                                className="form-select form-select-sm bg-dark text-light border-0 w-auto"
                                value={month}
                                onChange={(e) => setMonth(Number(e.target.value))}
                            >
                                {Array.from({ length: 12 }, (_, i) => i + 1).map(m =>
                                    <option key={m} value={m}>
                                        Tháng {m}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="card-body">
                            <canvas id="recentMovementChart" height="120"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
