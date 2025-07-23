import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { DashboardMetrics } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ChartsSectionProps {
  metrics: DashboardMetrics;
}

export function ChartsSection({ metrics }: ChartsSectionProps) {
  // Revenue chart data
  const revenueData = {
    labels: metrics.revenueChart.labels,
    datasets: [
      {
        label: 'Revenue ($)',
        data: metrics.revenueChart.data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Order status chart data
  const orderStatusData = {
    labels: metrics.orderStatusChart.labels,
    datasets: [
      {
        data: metrics.orderStatusChart.data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="box-border gap-x-[21px] grid grid-cols-none outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] mb-[21px] md:grid-cols-[repeat(2,minmax(0px,1fr))]">
      <div className="bg-white box-border gap-x-[21px] flex flex-col col-end-[span_1] col-start-[span_1] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] border rounded-[12.75px] border-solid border-black/10">
        <div className="items-start box-border gap-x-[5.25px] grid auto-rows-min grid-rows-[auto_auto] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[5.25px] pt-[21px] px-[21px]">
          <h4 className="font-medium box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]">Revenue Trends</h4>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)]">Monthly revenue and order volume</p>
        </div>
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] pb-[21px] px-[21px]">
          <div className="box-border h-[300px] outline-[oklab(0.708_0_0_/_0.5)] w-full">
            <Line data={revenueData} options={lineOptions} />
          </div>
        </div>
      </div>
      <div className="bg-white box-border gap-x-[21px] flex flex-col col-end-[span_1] col-start-[span_1] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] border rounded-[12.75px] border-solid border-black/10">
        <div className="items-start box-border gap-x-[5.25px] grid auto-rows-min grid-rows-[auto_auto] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[5.25px] pt-[21px] px-[21px]">
          <h4 className="font-medium box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]">Order Status Distribution</h4>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)]">Current order status breakdown</p>
        </div>
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] pb-[21px] px-[21px]">
          <div className="box-border h-[300px] outline-[oklab(0.708_0_0_/_0.5)] w-full">
            <Doughnut data={orderStatusData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
