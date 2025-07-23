import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { MainContent } from './layout/MainContent';

export function Dashboard() {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  return (
    <div className="text-[oklch(0.145_0_0)] text-sm not-italic normal-nums font-normal accent-auto bg-white box-border block tracking-[normal] leading-[21px] list-outside list-disc outline-[oklab(0.708_0_0_/_0.5)] text-start indent-[0px] normal-case visible border-separate font-ui_sans_serif">
      <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
        <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
          <div className="box-border outline-[oklab(0.708_0_0_/_0.5)]">
            <div className="relative box-border basis-0 grow shrink-0 h-[1000px] min-h-px min-w-px outline-[oklab(0.708_0_0_/_0.5)] w-full">
              <div className="box-border flex h-[1000px] outline-[oklab(0.708_0_0_/_0.5)]">
                <Sidebar activeItem={currentPath} />
                <div className="box-border flex basis-[0%] flex-col grow outline-[oklab(0.708_0_0_/_0.5)] overflow-hidden">
                  <Header />
                  {currentPath === 'dashboard' ? (
                    <MainContent />
                  ) : (
                    <Outlet />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="absolute box-border block outline-[oklab(0.708_0_0_/_0.5)] text-nowrap top-[-20000px] left-0">0</span>
    </div>
  );
}
