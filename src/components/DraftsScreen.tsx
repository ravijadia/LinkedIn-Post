import React, { useState } from 'react';
import { SavedDraft } from '../types';

interface DraftsScreenProps {
  drafts: SavedDraft[];
  onLoadDraft: (draft: SavedDraft) => void;
  onDeleteDraft: (id: string) => void;
  onCreateNew: () => void;
  showToast: (msg: string) => void;
}

export const DraftsScreen: React.FC<DraftsScreenProps> = ({
  drafts,
  onLoadDraft,
  onDeleteDraft,
  onCreateNew,
  showToast,
}) => {
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

  const handleCopyDraft = (draft: SavedDraft) => {
    navigator.clipboard.writeText(draft.content).then(() => {
      setCopiedDraftId(draft.id);
      showToast('Draft text copied to clipboard!');
      setTimeout(() => setCopiedDraftId(null), 2000);
    });
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-md mx-auto md:max-w-xl">
      {/* Header Info */}
      <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#dce9ff]/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#004e99]/10 flex items-center justify-center text-[#004e99] shrink-0">
            <span className="material-symbols-outlined text-[20px]">post_add</span>
          </div>
          <div>
            <h2 className="text-xs font-bold text-[#0b1c30]">Your Saved Post Variations</h2>
            <p className="text-[11px] text-[#414752]">
              {drafts.length} draft{drafts.length === 1 ? '' : 's'} prepared for TechPulse 2025
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCreateNew}
          className="px-2.5 py-1 bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-xs"
        >
          <span className="material-symbols-outlined text-[15px]">add</span>
          <span>New</span>
        </button>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-[#e5eeff] text-center flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-[36px] text-[#454f60]">drafts</span>
          <p className="text-xs font-bold text-[#0b1c30]">No saved drafts yet</p>
          <p className="text-[11px] text-[#414752]">
            Generate a post in the Workbench and click "Save as Draft" to keep it here.
          </p>
          <button
            type="button"
            onClick={onCreateNew}
            className="mt-2 px-4 py-2 bg-[#0a66c2] text-white text-xs font-semibold rounded-lg"
          >
            Go to Workbench
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-3 hover:border-[#0a66c2]/40 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-[#0b1c30]">{draft.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#414752]">
                    <span className="text-[#004e99] font-medium">{draft.tone}</span>
                    <span>•</span>
                    <span>{draft.lastEdited}</span>
                  </div>
                </div>
                {draft.isReady && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#97f7b6]/30 text-[#006d3c] text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006d3c]"></span>
                    Ready
                  </span>
                )}
              </div>

              <p className="text-xs text-[#0b1c30] leading-relaxed line-clamp-3 bg-[#eff4ff]/60 p-2.5 rounded-lg border border-[#e5eeff]">
                {draft.content}
              </p>

              {draft.mediaName && (
                <div className="flex items-center gap-1.5 text-[11px] text-[#414752]">
                  <span className="material-symbols-outlined text-[15px] text-[#0a66c2]">image</span>
                  <span>Attached: {draft.mediaName}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-[#e5eeff]/60">
                <button
                  type="button"
                  onClick={() => onDeleteDraft(draft.id)}
                  className="text-[11px] text-[#ba1a1a] hover:underline flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyDraft(draft)}
                    className="px-2.5 py-1.5 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0a66c2] text-xs font-semibold rounded-md flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedDraftId === draft.id ? 'done' : 'content_copy'}
                    </span>
                    <span>{copiedDraftId === draft.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onLoadDraft(draft);
                      showToast(`Loaded "${draft.title}" into Workbench`);
                    }}
                    className="px-3 py-1.5 bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-semibold rounded-md flex items-center gap-1 shadow-xs"
                  >
                    <span>Edit / Preview</span>
                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
