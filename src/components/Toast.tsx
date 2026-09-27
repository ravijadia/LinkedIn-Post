import React from 'react';

interface ToastProps {
  message: string | null;
  isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!message || !isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#213145] text-[#eaf1ff] text-xs font-semibold rounded-full shadow-2xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <span className="material-symbols-outlined text-[#97f7b6] text-[18px]">done</span>
      <span>{message}</span>
    </div>
  );
};
