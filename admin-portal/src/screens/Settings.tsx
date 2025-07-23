import React from 'react';

export function Settings() {
  return (
    <main className="bg-[oklab(0.944144_0.00154236_-0.00510991_/_0.5)] box-border basis-[0%] grow outline-[oklab(0.708_0_0_/_0.5)] overflow-auto p-[21px]">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)] mb-[21px]">
          <h1 className="text-[26.25px] font-bold box-border leading-[31.5px] outline-[oklab(0.708_0_0_/_0.5)]">Settings</h1>
          <p className="text-gray-500 box-border outline-[oklab(0.708_0_0_/_0.5)]">Manage your platform settings and preferences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-[12.75px] border border-solid border-black/10 mb-6">
              <h2 className="text-lg font-semibold mb-4">Settings Menu</h2>
              <nav className="space-y-1">
                {[
                  { name: 'General', active: true },
                  { name: 'Account', active: false },
                  { name: 'Notifications', active: false },
                  { name: 'Security', active: false },
                  { name: 'Billing', active: false },
                  { name: 'API & Integrations', active: false },
                  { name: 'Platform Settings', active: false },
                ].map((item, index) => (
                  <button 
                    key={index} 
                    className={`w-full text-left px-4 py-2 rounded-md text-sm ${
                      item.active 
                        ? 'bg-gray-950 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            
            <div className="bg-white p-4 rounded-[12.75px] border border-solid border-black/10">
              <h2 className="text-lg font-semibold mb-4">Help & Support</h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  Documentation
                </button>
                <button className="w-full text-left px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  Contact Support
                </button>
                <button className="w-full text-left px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  FAQs
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-[12.75px] border border-solid border-black/10 mb-6">
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-2">Platform Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Platform Name</label>
                      <input 
                        type="text" 
                        defaultValue="FoodAdmin" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Contact Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@fooddelivery.com" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Support Phone</label>
                      <input 
                        type="tel" 
                        defaultValue="+1 (555) 123-4567" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Regional Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Time Zone</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <option>UTC-08:00 Pacific Time (US & Canada)</option>
                        <option>UTC-05:00 Eastern Time (US & Canada)</option>
                        <option>UTC+00:00 London</option>
                        <option>UTC+01:00 Paris, Berlin</option>
                        <option>UTC+08:00 Singapore, Hong Kong</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Date Format</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Currency</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                        <option>CAD (C$)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Appearance</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Theme</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="theme" defaultChecked className="mr-2" />
                          <span className="text-sm">Light</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="theme" className="mr-2" />
                          <span className="text-sm">Dark</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="theme" className="mr-2" />
                          <span className="text-sm">System</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Sidebar Position</label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name="sidebar" defaultChecked className="mr-2" />
                          <span className="text-sm">Left</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="sidebar" className="mr-2" />
                          <span className="text-sm">Right</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Compact Mode</label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" name="compact" id="compact" className="sr-only" />
                        <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">Cancel</button>
                <button className="px-4 py-2 bg-gray-950 text-white rounded-md text-sm">Save Changes</button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-[12.75px] border border-solid border-black/10">
              <h2 className="text-lg font-semibold mb-4">System Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Platform Version</span>
                  <span className="text-sm font-medium">v2.5.3</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium">May 15, 2023</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Database Status</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">License</span>
                  <span className="text-sm font-medium">Enterprise</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="text-blue-600 text-sm hover:underline">Check for Updates</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
