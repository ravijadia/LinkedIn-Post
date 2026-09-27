import React, { useState } from 'react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (time: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onSchedule,
}) => {
  const [selectedTime, setSelectedTime] = useState('Today, 4:15 PM PST');
  const [customTime, setCustomTime] = useState('16:15');
  const [customDate, setCustomDate] = useState('2025-10-15');

  if (!isOpen) return null;

  const presets = [
    {
      title: 'Today, 4:15 PM PST',
      badge: 'Peak SF Tech Engagement',
      sub: 'Audience breaks between afternoon keynotes and networking reception.',
    },
    {
      title: 'Tomorrow, 8:45 AM PST',
      badge: 'Morning Commute Window',
      sub: 'Top feed visibility before Day 2 morning keynote begins.',
    },
    {
      title: 'Tomorrow, 12:30 PM PST',
      badge: 'Lunch & Exhibition Hour',
      sub: 'High mobile browsing activity during summit expo floor demos.',
    },
  ];

  const handleConfirm = () => {
    onSchedule(selectedTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-[#e5eeff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#006d3c]">
              schedule
            </span>
            <span className="text-sm font-bold text-[#0b1c30]">Schedule LinkedIn Post</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#414752] hover:text-[#0b1c30]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#414752]">
          EventPulse analyzes attendee activity at Moscone Center to maximize visibility in peer feeds.
        </p>

        {/* Presets */}
        <div className="flex flex-col gap-2">
          {presets.map((p) => {
            const isSelected = selectedTime === p.title;
            return (
              <div
                key={p.title}
                onClick={() => setSelectedTime(p.title)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'border-[#0a66c2] bg-[#eff4ff] ring-1 ring-[#0a66c2]'
                    : 'border-[#e5eeff] hover:bg-[#f8f9ff]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0b1c30]">{p.title}</span>
                  <span className="text-[10px] font-semibold text-[#006d3c] bg-[#97f7b6]/30 px-2 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[11px] text-[#414752]">{p.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#e5eeff]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-[#e5eeff] text-xs font-semibold text-[#414752] hover:bg-[#eff4ff]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-semibold shadow-xs"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
