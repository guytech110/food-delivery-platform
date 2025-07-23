import React from 'react';
import { Link } from 'react-router-dom';
import { navigationItems } from '../../data/navigationData';

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'dashboard' }: SidebarProps) {
  return (
    <div className="bg-white box-border hidden flex-col min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] w-56 border-r border-solid border-black/10 md:flex md:min-h-[auto] md:min-w-[auto]">
      <div className="box-border flex flex-col h-full min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] md:min-h-[auto] md:min-w-[auto]">
        <div className="items-center box-border flex h-[49px] min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] px-3.5 border-b border-solid border-black/10 md:min-h-[auto] md:min-w-[auto]">
          <Link to="/" className="items-center box-border gap-x-[7px] flex min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] gap-y-[7px] md:min-h-[auto] md:min-w-[auto]">
            <div className="items-center bg-gray-950 box-border flex h-7 justify-center min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] w-7 rounded-[8.75px] md:min-h-[auto] md:min-w-[auto]">
              <img src="https://c.animaapp.com/mdgb88he08nuIz/assets/icon-1.svg" alt="Icon" className="text-[oklch(1_0_0)] box-border h-[17.5px] outline-[oklab(0.708_0_0_/_0.5)] w-[17.5px]" />
            </div>
            <span className="font-semibold box-border block min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] md:min-h-[auto] md:min-w-[auto]">FoodAdmin</span>
          </Link>
        </div>
        <nav className="box-border basis-[0%] grow min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] p-3.5 md:min-h-[auto] md:min-w-[auto]">
          {navigationItems.map((item, index) => (
            <Link 
              key={item.id}
              to={`/${item.id}`}
              className={
                activeItem === item.id 
                  ? "text-[oklch(1_0_0)] items-center bg-gray-950 gap-x-[10.5px] flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-[10.5px] text-center w-full mb-[3.5px] px-[10.5px] py-[7px] rounded-[8.75px]" 
                  : index === navigationItems.length - 1 
                    ? "text-gray-500 items-center bg-transparent hover:bg-gray-100 gap-x-[10.5px] flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-[10.5px] text-center w-full px-[10.5px] py-[7px] rounded-[8.75px]" 
                    : "text-gray-500 items-center bg-transparent hover:bg-gray-100 gap-x-[10.5px] flex outline-[oklab(0.708_0_0_/_0.5)] gap-y-[10.5px] text-center w-full mb-[3.5px] px-[10.5px] py-[7px] rounded-[8.75px]"
              }
            >
              <img src={item.icon} alt="Icon" className="box-border h-[17.5px] outline-[oklab(0.708_0_0_/_0.5)] w-[17.5px]" />
              <span className="box-border block min-h-0 min-w-0 outline-[oklab(0.708_0_0_/_0.5)] md:min-h-[auto] md:min-w-[auto]">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
