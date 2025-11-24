"use client";
import React from "react";
import HomeLayout from "../_components/home-layout";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import OverviewStats from "./_components/OverviewStats";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Modern chart configurations
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const salesData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [
        4000, 3000, 5000, 4000, 6000, 5000, 3500, 4500, 2000, 4000, 5050, 6500,
      ],
      fill: true,
      backgroundColor: "rgba(79, 70, 229, 0.1)",
      borderColor: "#4F46E5",
      tension: 0.4,
      pointBackgroundColor: "#4F46E5",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
    },
  ],
};

const inventoryData = {
  labels: ["Servers", "Computers", "Printers", "Monitors", "Phones"],
  datasets: [
    {
      label: "Stock Levels",
      data: [120, 98, 86, 45, 60],
      backgroundColor: [
        "rgba(34, 197, 94, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(236, 72, 153, 0.8)",
      ],
      borderColor: ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"],
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
};

const hrData = {
  labels: ["Active", "On Leave", "New Hires"],
  datasets: [
    {
      data: [25, 5, 3],
      backgroundColor: ["#10B981", "#F59E0B", "#3B82F6"],
      borderColor: ["#0f9668", "#d97706", "#1d4ed8"],
      borderWidth: 2,
      cutout: "70%",
    },
  ],
};

const fleetData = {
  labels: ["Available", "On Route", "Maintenance"],
  datasets: [
    {
      data: [4, 5, 2],
      backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
      borderColor: ["#0f9668", "#d97706", "#dc2626"],
      borderWidth: 2,
      cutout: "70%",
    },
  ],
};

function Admin() {
  return (
    <HomeLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {`Welcome back! Here's what's happening with your business today.`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: Just now
            </div>
          </div>
        </div>

        {/* Live KPI cards */}
        <div className="mb-6">
          <OverviewStats />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Sales Overview
              </h2>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <span>↑ 12.5%</span>
                <span>vs last month</span>
              </div>
            </div>
            <div className="h-80">
              <Line data={salesData} options={chartOptions} />
            </div>
          </div>

          {/* Inventory Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Inventory Levels
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Items: 409
              </div>
            </div>
            <div className="h-80">
              <Bar data={inventoryData} options={chartOptions} />
            </div>
          </div>

          {/* HR Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Workforce Status
              </h2>
              <div className="text-sm text-green-600 dark:text-green-400">
                33 Total Employees
              </div>
            </div>
            <div className="h-80 relative">
              <Doughnut data={hrData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    33
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Employees
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fleet Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Fleet Management
              </h2>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                11 Total Vehicles
              </div>
            </div>
            <div className="h-80 relative">
              <Doughnut data={fleetData} options={chartOptions} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    11
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Vehicles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Need help with something?
              </h3>
              <p className="text-blue-100">
                Quick access to common tasks and settings
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
                Add New Item
              </button>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Admin;
