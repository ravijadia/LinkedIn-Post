import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { TabType, UserRole } from '../types';

interface HeaderProps {
  currentTab: TabType;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNotificationClick: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  userRole,
  onRoleChange,
  unreadCount = 2,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const getSubheadTitle = () => {
    switch (currentTab) {
      case 'prompt-workbench':
        return 'Prompt Workbench';
      case 'event-campaigns':
        return 'Event Campaigns';
      case 'post-templates':
        return 'Post Templates';
      case 'saved-drafts':
        return 'Saved Drafts';
      default:
        return 'Prompt Workbench';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pt-safe bg-[#ffffff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]/60">
      <div className="max-w-md mx-auto md:max-w-xl h-28 px-4 flex flex-col justify-between py-2">
        {/* Top brand row */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & title */}
          <div className="flex items-center gap-2.5 min-w-0">
            {!imgError ? (
              <img
                src={ASSETS.logo}
                alt="EventPulse Logo"
                className="h-8 w-auto object-contain shrink-0"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
              </div>
            )}
            <div className="flex flex-col truncate">
              <span className="text-[17px] font-bold text-[#004e99] tracking-tight leading-tight">
                EventPulse
              </span>
              <span className="text-[11px] font-semibold text-[#414752] uppercase tracking-wider truncate">
                {getSubheadTitle()}
              </span>
            </div>
          </div>

          {/* Right actions: notification + profile avatar */}
          <div className="flex items-center gap-1.5 shrink-0 relative">
            {/* Notification button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                aria-label="Notifications"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#414752] hover:text-[#004e99] hover:bg-[#eff4ff] transition-colors relative"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#0a66c2] ring-2 ring-white"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-xl border border-[#dce9ff] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#e5eeff]">
                    <span className="text-xs font-bold text-[#0b1c30]">Recent Activity</span>
                    <span className="text-[10px] text-[#0a66c2] font-semibold">2 New</span>
                  </div>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-start gap-2 p-1.5 rounded-lg bg-[#eff4ff]">
                      <span className="material-symbols-outlined text-[18px] text-[#006d3c] mt-0.5">trending_up</span>
                      <div className="text-xs">
                        <p className="font-semibold text-[#0b1c30]">Campaign Milestone</p>
                        <p className="text-[11px] text-[#414752]">TechPulse reached 1,248 attendee posts!</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-[#eff4ff] transition-colors">
                      <span className="material-symbols-outlined text-[18px] text-[#0a66c2] mt-0.5">auto_awesome</span>
                      <div className="text-xs">
                        <p className="font-semibold text-[#0b1c30]">Peak Time Reached</p>
                        <p className="text-[11px] text-[#414752]">SF tech engagement is peak now.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="w-9 h-9 rounded-full ring-2 ring-transparent hover:ring-[#0a66c2]/40 transition-all overflow-hidden flex items-center justify-center bg-[#e5eeff]"
                aria-label="User Profile"
              >
                {!avatarError ? (
                  <img
                    src={ASSETS.profileElena}
                    alt="Elena Rostova"
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="text-xs font-bold text-[#004e99]">ER</span>
                )}
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-[#dce9ff] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#e5eeff]">
                    <img
                      src={ASSETS.profileElena}
                      alt="Elena Rostova"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#0b1c30] truncate">Elena Rostova</p>
                      <p className="text-[11px] text-[#414752] truncate">Staff Product Designer</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pt-2 text-xs text-[#0b1c30]">
                    <div className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#eff4ff] cursor-pointer">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#414752]">badge</span>
                        LinkedIn Connected
                      </span>
                      <span className="text-[10px] font-semibold text-[#006d3c] bg-[#97f7b6]/30 px-1.5 py-0.5 rounded">Active</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[#eff4ff] cursor-pointer">
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#414752]">business</span>
                        Nexus Tech Host
                      </span>
                      <span className="text-[10px] text-[#414752]">Organizer</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Organizer vs Attendee View Segmented Control */}
        <div className="w-full flex items-center p-0.5 bg-[#eff4ff] rounded-lg border border-[#e5eeff]">
          <button
            type="button"
            onClick={() => onRoleChange('organizer')}
            className={`flex-1 h-9 rounded-lg text-[13px] font-semibold flex items-center justify-center transition-all duration-200 ${
              userRole === 'organizer'
                ? 'bg-[#0a66c2] text-white shadow-sm font-bold'
                : 'text-[#414752] hover:text-[#0b1c30]'
            }`}
          >
            Organizer
          </button>
          <button
            type="button"
            onClick={() => onRoleChange('attendee')}
            className={`flex-1 h-9 rounded-lg text-[13px] font-semibold flex items-center justify-center transition-all duration-200 ${
              userRole === 'attendee'
                ? 'bg-[#0a66c2] text-white shadow-sm font-bold'
                : 'text-[#414752] hover:text-[#0b1c30]'
            }`}
          >
            Attendee View
          </button>
        </div>
      </div>
    </header>
  );
};
