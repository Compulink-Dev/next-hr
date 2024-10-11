'use client'
import React from 'react';
import HomeLayout from '../_components/home-layout';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
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
    ArcElement
} from 'chart.js';

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

// Sample data for charts
const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Sales',
            data: [4000, 3000, 5000, 4000, 6000, 5000, 3500, 4500, 2000, 4000, 5050, 6500],
            fill: false,
            borderColor: '#4F46E5',
            tension: 0.1,
        },
    ],
};

const inventoryData = {
    labels: ['Servers', 'Computers', 'Printers', 'Monitors', 'Phone'],
    datasets: [
        {
            label: 'Stock',
            data: [120, 98, 86, 45, 60],
            backgroundColor: ['#34D399', '#60A5FA', '#FBBF24', '#60A5FA'],
        },
    ],
};

const hrData = {
    labels: ['Available', 'On Leave', 'Terminated'],
    datasets: [
        {
            data: [25, 5, 2],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        },
    ],
};

const fleetData = {
    labels: ['Available', 'On Duty', 'Off Duty'],
    datasets: [
        {
            data: [4, 5, 2],
            backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        },
    ],
};

function Admin() {
    return (
        <HomeLayout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Inventory Card */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Inventory</h2>
                    <p>Current Stock: 120</p>
                </div>

                {/* Sales Card */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                    <p>$ 35,000</p>
                </div>

                {/* HR Card */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Human Resources</h2>
                    <p>Active Employees: 25</p>
                </div>
            </div>

            {/* Sales Chart */}
            <div className="mt-8 bg-white shadow rounded-lg p-4 w-full">
                <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
                <div className="w-full h-[400px]">
                    <Line data={salesData} />
                </div>
            </div>

            {/* Inventory Chart */}
            <div className="mt-8 bg-white shadow rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Inventory Levels</h2>
                <div className="w-full h-full md:h-[300px]">
                    <Bar data={inventoryData} />
                </div>
            </div>

            <div className="grid grid-col-1 md:grid-cols-2 gap-2 w-full">

                {/* HR Chart */}
                <div className="mt-8 bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">HR Status</h2>
                    <div className="w-full h-[300px] md:h-[400px]">  {/* Set the size using Tailwind classes */}
                        <Doughnut data={hrData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>


                {/* Fleet Chart */}
                <div className="mt-8 bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-4">Fleet</h2>
                    <div className="w-full h-[300px] md:h-[400px]">  {/* Set the size using Tailwind classes */}
                        <Doughnut data={fleetData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

        </HomeLayout>
    );
}

export default Admin;
