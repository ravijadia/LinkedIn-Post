import React, { useState } from 'react';
import { POST_TEMPLATES } from '../data/initialData';
import { NarrativeTone, PostTemplate } from '../types';

interface TemplatesScreenProps {
  onSelectTemplate: (template: PostTemplate) => void;
  showToast: (msg: string) => void;
}

export const TemplatesScreen: React.FC<TemplatesScreenProps> = ({
  onSelectTemplate,
  showToast,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'Grateful Attendee', label: 'Grateful' },
    { id: 'Key Takeaway', label: 'Key Takeaways' },
    { id: 'Speaker Shoutout', label: 'Speakers' },
    { id: 'Professional', label: 'Executive' },
  ];

  const filtered =
    filter === 'all'
      ? POST_TEMPLATES
      : POST_TEMPLATES.filter((t) => t.tone === filter);

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-md mx-auto md:max-w-xl">
      {/* Header Info */}
      <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#dce9ff]/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0a66c2]/10 flex items-center justify-center text-[#0a66c2] shrink-0">
            <span className="material-symbols-outlined text-[20px]">dashboard_customize</span>
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#0b1c30]">Curated Event Post Formulas</h2>
            <p className="text-[11px] text-[#414752]">Battle-tested structures for high LinkedIn engagement</p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === cat.id
                ? 'bg-[#0a66c2] text-white font-semibold shadow-xs'
                : 'bg-[#eff4ff] text-[#414752] hover:bg-[#e5eeff]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="flex flex-col gap-3">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-2.5 hover:border-[#0a66c2]/40 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#0b1c30]">{tpl.title}</span>
                <span className="text-[11px] text-[#006d3c] font-semibold mt-0.5">
                  Tone: {tpl.tone}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#d6e3ff] text-[#001b3d] text-[10px] font-semibold">
                High Reach
              </span>
            </div>

            <p className="text-xs text-[#414752] leading-relaxed">
              {tpl.description}
            </p>

            {/* Template quote preview */}
            <div className="p-2.5 rounded-lg bg-[#eff4ff] border-l-2 border-[#0a66c2] text-xs text-[#0b1c30] italic font-sans">
              "{tpl.preview}"
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[11px] text-[#414752]">Auto-injects summit context</span>
              <button
                type="button"
                onClick={() => {
                  onSelectTemplate(tpl);
                  showToast(`Loaded "${tpl.title}" into Workbench!`);
                }}
                className="px-3 py-1.5 bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs active:scale-95 transition-all"
              >
                <span>Use in Workbench</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
