import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { navigationItems } from '../../data/navigationData';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="items-center bg-white box-border flex h-[49px] justify-between outline-[oklab(0.708_0_0_/_0.5)] px-3.5 border-b border-solid border-black/10 relative">
      <div className="items-center box-border gap-x-3.5 flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-3.5">
        <button 
          type="button" 
          onClick={toggleMobileMenu}
          className="text-[12.25px] font-medium items-center bg-white gap-x-[7px] flex shrink-0 h-[31.5px] justify-center leading-[17.5px] min-h-[auto] min-w-[auto] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] text-center text-nowrap w-[31.5px] border p-0 rounded-[6.75px] border-solid border-black/10 hover:bg-gray-50 md:hidden md:min-h-0 md:min-w-0"
        >
          <img src="https://c.animaapp.com/mdgb88he08nuIz/assets/icon-8.svg" alt="Icon" className="box-border shrink-0 h-3.5 outline-[oklab(0.708_0_0_/_0.5)] text-nowrap w-3.5" />
        </button>
        <button 
          className="text-[12.25px] font-medium items-center bg-white gap-x-[7px] hidden shrink-0 h-[31.5px] justify-center leading-[17.5px] min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] text-center text-nowrap w-[31.5px] border p-0 rounded-[6.75px] border-solid border-black/10 hover:bg-gray-50 md:flex md:min-h-[auto] md:min-w-[auto]"
          onClick={() => alert('Toggle sidebar')}
        >
          <img src="https://c.animaapp.com/mdgb88he08nuIz/assets/icon-8.svg" alt="Icon" className="box-border shrink-0 h-3.5 outline-[oklab(0.708_0_0_/_0.5)] text-nowrap w-3.5" />
        </button>
        <form onSubmit={handleSearch} className="relative box-border basis-[0%] grow max-w-[392px] outline-[oklab(0.708_0_0_/_0.5)]">
          <img src="https://c.animaapp.com/mdgb88he08nuIz/assets/icon-9.svg" alt="Icon" className="absolute text-gray-500 box-border h-3.5 outline-[oklab(0.708_0_0_/_0.5)] w-3.5 left-[10.5px] top-2/4 transform -translate-y-1/2" />
          <input 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm bg-gray-100 box-border flex h-[31.5px] leading-[21px] outline-[oklab(0.708_0_0_/_0.5)] w-full border pl-[35px] pr-[10.5px] py-[3.5px] rounded-[6.75px] border-solid border-transparent focus:border-gray-300 focus:bg-white transition-colors md:text-[12.25px] md:leading-[17.5px]" 
          />
        </form>
      </div>
      <div className="items-center box-border gap-x-3.5 flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-3.5">
        <button 
          className="text-[12.25px] font-medium items-center bg-white gap-x-[7px] flex shrink-0 h-[31.5px] justify-center leading-[17.5px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] text-center text-nowrap w-[31.5px] border p-0 rounded-[6.75px] border-solid border-black/10 hover:bg-gray-50"
          onClick={() => navigate('/settings')}
        >
          <img src="https://c.animaapp.com/mdgb88he08nuIz/assets/icon-10.svg" alt="Icon" className="box-border shrink-0 h-3.5 outline-[oklab(0.708_0_0_/_0.5)] text-nowrap w-3.5" />
        </button>
        <button 
          className="relative text-[12.25px] font-medium items-center bg-white gap-x-[7px] flex shrink-0 h-[31.5px] justify-center leading-[17.5px] outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] text-center text-nowrap w-[31.5px] border p-0 rounded-[6.75px] border-solid border-black/10 hover:bg-gray-50"
          onClick={() => alert('Notifications')}
        >
          <img src="https://c.animaapp.com/mdgb88he08nuIz/assets/icon-11.svg" alt="Icon" className="box-border shrink-0 h-3.5 outline-[oklab(0.708_0_0_/_0.5)] text-nowrap w-3.5" />
          <span className="absolute text-[oklch(1_0_0)] text-[10.5px] items-center bg-gray-950 box-border gap-x-[3.5px] flex shrink-0 h-[17.5px] justify-center leading-[14px] outline-[oklab(0.708_0_0_/_0.5)] right-[-7px] gap-y-[3.5px] text-nowrap top-[-7px] w-[17.5px] border overflow-hidden rounded-[6.75px] border-solid border-transparent">3</span>
        </button>
        <div className="relative">
          <div 
            className="items-center box-border gap-x-[7px] flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] cursor-pointer"
            onClick={toggleUserMenu}
          >
            <span className="relative box-border flex shrink-0 h-[35px] outline-[oklab(0.708_0_0_/_0.5)] w-[35px] overflow-hidden rounded-[3.35544e+07px]">
              <span className="items-center bg-blue-100 box-border flex h-full justify-center outline-[oklab(0.708_0_0_/_0.5)] w-full rounded-[3.35544e+07px]">
                <span className="text-blue-600 font-medium text-sm">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </span>
            </span>
            <div className="box-border hidden min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] md:block md:min-h-[auto] md:min-w-[auto]">
              <p className="text-[12.25px] font-medium box-border leading-[17.5px] outline-[oklab(0.708_0_0_/_0.5)]">
                {currentUser?.displayName || 'Admin User'}
              </p>
              <p className="text-gray-500 text-[10.5px] box-border leading-[14px] outline-[oklab(0.708_0_0_/_0.5)]">
                {currentUser?.email || 'admin@fooddelivery.com'}
              </p>
            </div>
          </div>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  <p className="font-medium">{currentUser?.displayName || 'Admin User'}</p>
                  <p className="text-gray-500 text-xs">{currentUser?.email}</p>
                </div>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-black/10 shadow-md z-50 md:hidden">
          <div className="p-3.5 flex flex-col gap-3.5">
            {navigationItems.map((item) => (
              <Link 
                key={item.id}
                to={`/${item.id}`}
                className="text-gray-700 text-left text-sm py-2 px-3 hover:bg-gray-50 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="text-red-600 text-left text-sm py-2 px-3 hover:bg-red-50 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
