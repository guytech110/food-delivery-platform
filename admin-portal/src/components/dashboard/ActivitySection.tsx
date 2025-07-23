import React, { useState } from 'react';
import { DashboardMetrics } from '../../types';

interface ActivitySectionProps {
  metrics: DashboardMetrics;
}

export function ActivitySection({ metrics }: ActivitySectionProps) {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const toggleActivity = (id: string) => {
    if (expandedActivity === id) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(id);
    }
  };

  return (
    <div className="box-border gap-x-[21px] grid grid-cols-none outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] md:grid-cols-[repeat(3,minmax(0px,1fr))]">
      <div className="bg-white box-border gap-x-[21px] flex flex-col col-end-[span_2] col-start-[span_2] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] border rounded-[12.75px] border-solid border-black/10">
        <div className="items-start box-border gap-x-[5.25px] grid auto-rows-min grid-rows-[auto_auto] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[5.25px] pt-[21px] px-[21px]">
          <h4 className="font-medium box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]">Recent Activity</h4>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)]">Latest platform activities and updates</p>
        </div>
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] pb-[21px] px-[21px]">
          <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
            {metrics.recentOrders.slice(0, 5).map((order, index) => (
              <div 
                key={order.id} 
                className={`items-center box-border gap-x-3.5 flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-3.5 border p-[10.5px] rounded-[8.75px] border-solid border-black/10 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${index !== Math.min(4, metrics.recentOrders.length - 1) ? 'mb-3.5' : ''} ${expandedActivity === order.id ? 'bg-gray-50' : ''}`}
                onClick={() => toggleActivity(order.id)}
              >
                <div className="box-border shrink-0 outline-[oklab(0.708_0_0_/_0.5)]">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">📦</span>
                </div>
                <div className="box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)]">
                  <p className="text-[12.25px] font-medium box-border leading-[17.5px] outline-[oklab(0.708_0_0_/_0.5)]">Order #{order.id.slice(-6)}</p>
                  <p className="text-gray-500 text-[10.5px] box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]">
                    {new Date(order.createdAt).toLocaleDateString()} - ${order.totalAmount}
                  </p>
                  {expandedActivity === order.id && (
                    <p className="text-gray-600 text-[11px] mt-2 box-border leading-[14px]">
                      {order.items.length} items • {order.deliveryAddress}
                    </p>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white box-border gap-x-[21px] flex flex-col outline-[oklab(0.708_0_0_/_0.5)] gap-y-[21px] border rounded-[12.75px] border-solid border-black/10">
        <div className="items-start box-border gap-x-[5.25px] grid auto-rows-min grid-rows-[auto_auto] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[5.25px] pt-[21px] px-[21px]">
          <h4 className="font-medium box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]">Quick Actions</h4>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)]">Common administrative tasks</p>
        </div>
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] pb-[21px] px-[21px]">
          {[
            { id: 'review-applications', label: 'Review Applications', icon: '📋' },
            { id: 'manage-orders', label: 'Manage Orders', icon: '📦' },
            { id: 'view-analytics', label: 'View Analytics', icon: '📊' },
            { id: 'user-management', label: 'User Management', icon: '👥' },
            { id: 'settings', label: 'Platform Settings', icon: '⚙️' }
          ].map((action, index) => (
            <button 
              key={action.id}
              onClick={() => alert(`Action: ${action.label}`)}
              className={`text-[12.25px] font-medium items-center bg-white gap-x-[7px] inline-flex shrink-0 h-[31.5px] justify-start leading-[17.5px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] text-center text-nowrap w-full border px-[10.5px] py-[7px] rounded-[6.75px] border-solid border-black/10 hover:bg-gray-50 transition-colors ${index !== 4 ? 'mb-[10.5px]' : ''}`}
            >
              <span className="box-border shrink-0 h-3.5 outline-[oklab(0.708_0_0_/_0.5)] text-nowrap w-3.5 mr-[7px]">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
