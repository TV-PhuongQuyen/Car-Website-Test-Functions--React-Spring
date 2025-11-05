import React from "react";
import SearchStatistics from "./SearchStatistics";
import TopUsersChart from "./TopUsersChart";

export default function StatisticsDashboard() {
    return (
        <div className="container-fluid bg-dark text-light min-vh-100 py-4 px-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-white mb-0">📊 Bảng Thống Kê Tìm Kiếm</h2>
                <button className="btn btn-primary">Tải Báo Cáo</button>
            </div>

            {/* Card 1 - Search Statistics */}
            <div className="card bg-secondary border-0 text-light shadow mb-4">
                <div className="card-header border-0 bg-secondary">
                    <h5 className="mb-0 fw-semibold">📈 Thống kê lượt tìm kiếm theo giờ</h5>
                </div>
                <div className="card-body bg-light text-dark rounded-bottom">
                    <SearchStatistics />
                </div>
            </div>

            {/* Card 2 - Top Users */}
            <div className="card bg-secondary border-0 text-light shadow">
                <div className="card-header border-0 bg-secondary">
                    <h5 className="mb-0 fw-semibold">👥 Top người dùng tìm kiếm nhiều nhất</h5>
                </div>
                <div className="card-body bg-light text-dark rounded-bottom">
                    <TopUsersChart />
                </div>
            </div>
        </div>
    );
}
