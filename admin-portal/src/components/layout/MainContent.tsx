import React, { useState, useEffect } from 'react';
import { StatsCards } from '../dashboard/StatsCards';
import { ChartsSection } from '../dashboard/ChartsSection';
import { ActivitySection } from '../dashboard/ActivitySection';
import { getDashboardMetrics } from '../../services/firebase';
import { DashboardMetrics } from '../../types';

export function MainContent() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please check your Firebase connection.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading real-time dashboard data from Firebase...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Connection Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] mb-[21px]">
          <h1 className="text-[26.25px] font-bold box-border leading-[31.5px] outline-[oklab(0.708_0_0_/_0.5)]">Dashboard Overview</h1>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)]">Welcome back! Here's what's happening with your food delivery platform today.</p>
        </div>
        {metrics && (
          <>
            <StatsCards metrics={metrics} />
            <ChartsSection metrics={metrics} />
            <ActivitySection metrics={metrics} />
          </>
        )}
      </div>
    </main>
  );
}
