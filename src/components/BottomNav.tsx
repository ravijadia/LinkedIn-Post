import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  draftsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  draftsCount = 3,
}) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'prompt-workbench', label: 'Generate', icon: 'auto_awesome' },
    { id: 'post-templates', label: 'Templates', icon: 'dashboard_customize' },
    { id: 'event-campaigns', label: 'Campaigns', icon: 'event_available' },
    { id: 'saved-drafts', label: 'Drafts', icon: 'post_add' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 pb-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.06)] border-t border-[#e5eeff]/80">
      <div className="max-w-md mx-auto md:max-w-xl flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] gap-0.5 transition-all relative ${
                isActive
                  ? 'text-[#0a66c2] font-semibold scale-105'
                  : 'text-[#414752] hover:text-[#0b1c30]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.id === 'saved-drafts' && draftsCount > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#0a66c2]"></span>
                )}
              </div>
              <span className={`text-[11px] leading-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
