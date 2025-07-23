import React, { useState, useEffect } from 'react';
import { DashboardMetrics } from '../../types';

interface StatsCardsProps {
  metrics: DashboardMetrics;
}

export function StatsCards({ metrics }: StatsCardsProps) {
  const [animatedStats, setAnimatedStats] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // Create dynamic stats data from metrics
    const dynamicStats = [
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: `$${metrics.totalRevenue.toLocaleString()}`,
        icon: '💰',
        iconClass: 'w-6 h-6',
        trendIcon: '📈',
        trendIconClass: 'w-4 h-4 mr-1',
        trendText: 'Live from Firebase',
        trendTextClass: 'text-green-600 text-sm'
      },
      {
        id: 'orders',
        title: 'Total Orders',
        value: metrics.totalOrders.toString(),
        icon: '📦',
        iconClass: 'w-6 h-6',
        trendIcon: '📈',
        trendIconClass: 'w-4 h-4 mr-1',
        trendText: 'Real-time data',
        trendTextClass: 'text-green-600 text-sm'
      },
      {
        id: 'users',
        title: 'Active Users',
        value: metrics.activeUsers.toString(),
        icon: '👥',
        iconClass: 'w-6 h-6',
        trendIcon: '📈',
        trendIconClass: 'w-4 h-4 mr-1',
        trendText: 'Connected users',
        trendTextClass: 'text-green-600 text-sm'
      },
      {
        id: 'applications',
        title: 'Pending Applications',
        value: metrics.pendingCookApplications.toString(),
        icon: '⏳',
        iconClass: 'w-6 h-6',
        trendIcon: '⚠️',
        trendIconClass: 'w-4 h-4 mr-1',
        trendText: 'Requires attention',
        trendTextClass: 'text-orange-600 text-sm'
      }
    ];

    // Animate the numbers counting up
    const finalValues: {[key: string]: number} = {};
    dynamicStats.forEach(stat => {
      const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''));
      finalValues[stat.id] = numericValue;
    });
    
    const startValues: {[key: string]: number} = {};
    Object.keys(finalValues).forEach(key => {
      startValues[key] = 0;
    });
    
    const duration = 1500; // ms
    const frameDuration = 16; // ms
    const frames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / frames;
      
      const currentValues: {[key: string]: string} = {};
      dynamicStats.forEach(stat => {
        const id = stat.id;
        const value = finalValues[id];
        const current = Math.floor(startValues[id] + progress * (value - startValues[id]));
        
        // Format the number with the same format as the original
        if (stat.value.includes('$')) {
          currentValues[id] = `$${current.toLocaleString()}`;
        } else {
          currentValues[id] = current.toLocaleString();
        }
      });
      
      setAnimatedStats(currentValues);
      
      if (frame === frames) {
        clearInterval(timer);
        // Set exact final values
        const exactValues: {[key: string]: string} = {};
        dynamicStats.forEach(stat => {
          exactValues[stat.id] = stat.value;
        });
        setAnimatedStats(exactValues);
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [metrics]);

  return (
    <div className="box-border gap-x-3.5 grid grid-cols-none outline-[oklab(0.708_0_0_/_0.5)] gap-y-3.5 mb-[21px] md:grid-cols-[repeat(4,minmax(0px,1fr))]">
      {[
        {
          id: 'revenue',
          title: 'Total Revenue',
          value: `$${metrics.totalRevenue.toLocaleString()}`,
          icon: '💰',
          iconClass: 'w-6 h-6',
          trendIcon: '📈',
          trendIconClass: 'w-4 h-4 mr-1',
          trendText: 'Live from Firebase',
          trendTextClass: 'text-green-600 text-sm'
        },
        {
          id: 'orders',
          title: 'Total Orders',
          value: metrics.totalOrders.toString(),
          icon: '📦',
          iconClass: 'w-6 h-6',
          trendIcon: '📈',
          trendIconClass: 'w-4 h-4 mr-1',
          trendText: 'Real-time data',
          trendTextClass: 'text-green-600 text-sm'
        },
        {
          id: 'users',
          title: 'Active Users',
          value: metrics.activeUsers.toString(),
          icon: '👥',
          iconClass: 'w-6 h-6',
          trendIcon: '📈',
          trendIconClass: 'w-4 h-4 mr-1',
          trendText: 'Connected users',
          trendTextClass: 'text-green-600 text-sm'
        },
        {
          id: 'applications',
          title: 'Pending Applications',
          value: metrics.pendingCookApplications.toString(),
          icon: '⏳',
          iconClass: 'w-6 h-6',
          trendIcon: '⚠️',
          trendIconClass: 'w-4 h-4 mr-1',
          trendText: 'Requires attention',
          trendTextClass: 'text-orange-600 text-sm'
        }
      ].map((stat) => (
        <div 
          key={stat.id} 
          className="bg-white box-border gap-x-[21px] flex flex-col outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] border rounded-[12.75px] border-solid border-black/10 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => alert(`View detailed ${stat.title.toLowerCase()} statistics`)}
        >
          <div className="items-center box-border gap-x-[5.25px] flex auto-rows-min grid-rows-[auto_auto] justify-between outline-[oklab(0.708_0_0_/_0.5)] gap-y-[5.25px] pt-[21px] pb-[7px] px-[21px]">
            <h4 className="text-[12.25px] font-medium box-border leading-[17.5px] outline-[oklab(0.708_0_0_/_0.5)]">{stat.title}</h4>
            <span className={stat.iconClass}>{stat.icon}</span>
          </div>
          <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] pb-[21px] px-[21px]">
            <div className="text-[21px] font-bold box-border leading-7 outline-[oklab(0.708_0_0_/_0.5)]">
              {animatedStats[stat.id] || '0'}
            </div>
            <div className="items-center box-border flex outline-[oklab(0.708_0_0_/_0.5)]">
              <span className={stat.trendIconClass}>{stat.trendIcon}</span>
              <p className={stat.trendTextClass}>{stat.trendText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
