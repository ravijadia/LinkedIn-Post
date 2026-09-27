import React, { useState } from 'react';
import { CampaignData } from '../types';

interface CampaignsScreenProps {
  campaign: CampaignData;
  onUpdateCampaign: (updated: Partial<CampaignData>) => void;
  onNavigateToGenerate: () => void;
  showToast: (msg: string) => void;
}

export const CampaignsScreen: React.FC<CampaignsScreenProps> = ({
  campaign,
  onUpdateCampaign,
  onNavigateToGenerate,
  showToast,
}) => {
  const [eventName, setEventName] = useState(campaign.eventName);
  const [organizer, setOrganizer] = useState(campaign.organizer);
  const [hashtags, setHashtags] = useState<string[]>(campaign.hashtags);
  const [newTagInput, setNewTagInput] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState(campaign.linkedinUrl);
  const [twitterHandle, setTwitterHandle] = useState(campaign.twitterHandle);
  const [websiteUrl, setWebsiteUrl] = useState(campaign.websiteUrl);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Copy attendee portal link
  const handleCopyPortalLink = () => {
    navigator.clipboard
      .writeText(`https://${campaign.attendeePortalUrl}`)
      .then(() => {
        setCopiedLink(true);
        showToast('Attendee portal link copied to clipboard!');
        setTimeout(() => setCopiedLink(false), 2000);
      })
      .catch(() => {
        showToast('Attendee link ready to share: ' + campaign.attendeePortalUrl);
      });
  };

  // Add tag
  const handleAddTag = () => {
    let tag = newTagInput.trim();
    if (!tag) return;
    if (!tag.startsWith('#')) {
      tag = '#' + tag;
    }
    if (!hashtags.includes(tag)) {
      const updated = [...hashtags, tag];
      setHashtags(updated);
      setNewTagInput('');
      showToast(`Added ${tag} to campaign`);
    } else {
      setNewTagInput('');
    }
  };

  // Remove tag
  const handleRemoveTag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((t) => t !== tagToRemove));
  };

  // Save form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onUpdateCampaign({
        eventName,
        organizer,
        hashtags,
        linkedinUrl,
        twitterHandle,
        websiteUrl,
      });
      setIsSaving(false);
      setSaveSuccess(true);
      showToast('Event campaign settings published successfully!');

      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-md mx-auto md:max-w-xl">
      {/* Subtle Status Alert / Motivation Header */}
      <div className="flex items-center justify-between bg-[#eff4ff] p-3 rounded-xl shadow-xs border border-[#dce9ff]/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#004e99]/10 flex items-center justify-center text-[#004e99] shrink-0">
            <span className="material-symbols-outlined text-[20px]">campaign</span>
          </div>
          <div className="truncate">
            <div className="text-xs text-[#0b1c30] font-semibold truncate">Q4 Flagship Campaign</div>
            <div className="text-[11px] text-[#414752] truncate">Amplifying organic attendee reach</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006d3c]/10 text-[#006d3c] text-[11px] font-semibold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006d3c] animate-pulse"></span>
          Tracking Live
        </span>
      </div>

      {/* Event Overview Card: Live Event Summary */}
      <div className="flex flex-col bg-white rounded-xl shadow-sm border border-[#e5eeff] p-4 gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#006d3c]/10 text-[#006d3c] text-[11px] font-semibold">
                {campaign.status}
              </span>
              <span className="text-[11px] text-[#414752]">ID: {campaign.campaignId}</span>
            </div>
            <h2 className="text-[18px] text-[#0b1c30] font-bold tracking-tight">
              {campaign.eventName}
            </h2>
            <p className="text-xs text-[#414752] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-[#454f60]">business</span>
              {campaign.organizer} • {campaign.dateRange}, {campaign.location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => showToast('Live attendee analytics updated')}
            title="Insights"
            className="w-10 h-10 rounded-lg bg-[#e5eeff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0a66c2] shrink-0 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">insights</span>
          </button>
        </div>

        {/* Post Metrics Grid (3 cols) */}
        <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] p-2 rounded-lg">
          <div className="flex flex-col items-center justify-center p-2 text-center bg-white rounded-md shadow-xs">
            <span className="text-[16px] font-bold text-[#004e99] tabular-nums">
              {campaign.postsCreated.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#414752] mt-0.5 font-medium">Posts Created</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center bg-white rounded-md shadow-xs">
            <span className="text-[16px] font-bold text-[#0b1c30] tabular-nums">
              {campaign.impressions}
            </span>
            <span className="text-[11px] text-[#414752] mt-0.5 font-medium">Impressions</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 text-center bg-white rounded-md shadow-xs">
            <span className="text-[16px] font-bold text-[#006d3c] tabular-nums">
              {campaign.avgEngagement}
            </span>
            <span className="text-[11px] text-[#414752] mt-0.5 font-medium">Avg Engaged</span>
          </div>
        </div>

        {/* Shareable attendee link box */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-[#0b1c30] uppercase tracking-wider">
              Attendee Link Portal
            </label>
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="text-[11px] font-semibold text-[#0a66c2] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
              Show Badge QR
            </button>
          </div>
          <div className="flex items-center gap-2 p-1.5 pl-3 bg-[#eff4ff] rounded-lg border border-[#e5eeff]">
            <span className="material-symbols-outlined text-[18px] text-[#414752] shrink-0">
              link
            </span>
            <input
              className="bg-transparent text-xs text-[#0b1c30] min-w-0 flex-1 outline-none font-mono selection:bg-[#0a66c2]/20"
              readOnly
              type="text"
              value={campaign.attendeePortalUrl}
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              type="button"
              onClick={handleCopyPortalLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md shadow-xs transition-all shrink-0 active:scale-95 ${
                copiedLink
                  ? 'bg-[#006d3c] text-white'
                  : 'bg-white hover:bg-[#e5eeff] text-[#0a66c2]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedLink ? 'done' : 'content_copy'}
              </span>
              <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Quick action preview teaser */}
        <button
          type="button"
          onClick={onNavigateToGenerate}
          className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-[#d6e3ff]/70 to-[#e5eeff] rounded-lg text-left text-[#001b3d] hover:opacity-95 transition-all shadow-xs border border-[#d6e3ff]"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#0a66c2] text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-[#001b3d] truncate">Test Attendee Experience</span>
              <span className="text-[11px] text-[#00468a] truncate">Preview generator with pre-filled event hooks</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#004e99] shrink-0">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Create Event / Campaign Form Card */}
      <div className="flex flex-col bg-white rounded-xl shadow-sm border border-[#e5eeff] p-4 gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0a66c2]"></div>
            <h3 className="text-[16px] text-[#0b1c30] font-bold">Campaign Details</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#004e99]/10 text-[#004e99] text-[11px] font-semibold">
            Active Setup
          </span>
        </div>

        <form onSubmit={handleSaveForm} className="flex flex-col gap-3">
          {/* Event Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#0b1c30]" htmlFor="event-title">
              Event Name
            </label>
            <div className="relative flex items-center bg-[#eff4ff] rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0a66c2]/40 border border-[#e5eeff] transition-all">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#414752]">
                event
              </span>
              <input
                id="event-title"
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Developer Velocity Con"
                className="w-full bg-transparent pl-10 pr-3 py-2.5 text-xs text-[#0b1c30] rounded-lg outline-none"
              />
            </div>
          </div>

          {/* Organizer Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#0b1c30]" htmlFor="org-name">
              Organizer / Host Entity
            </label>
            <div className="relative flex items-center bg-[#eff4ff] rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0a66c2]/40 border border-[#e5eeff] transition-all">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#414752]">
                corporate_fare
              </span>
              <input
                id="org-name"
                type="text"
                required
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="e.g. Nexus Tech Corp"
                className="w-full bg-transparent pl-10 pr-3 py-2.5 text-xs text-[#0b1c30] rounded-lg outline-none"
              />
            </div>
          </div>

          {/* Event Hashtags Section */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#0b1c30]">
                Mandatory LinkedIn Hashtags
              </label>
              <span className="text-[11px] text-[#414752]">Attendees get these pre-injected</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#eff4ff] rounded-lg border border-[#e5eeff] min-h-[46px]">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#004e99] text-[11px] font-semibold shadow-xs border border-[#dce9ff]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove ${tag}`}
                    className="text-[#414752] hover:text-[#ba1a1a] flex items-center"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}

              {/* Add Tag input */}
              <div className="inline-flex items-center gap-1">
                <input
                  type="text"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="+ Add tag"
                  className="bg-transparent text-[11px] text-[#0b1c30] py-1 px-2 w-20 outline-none placeholder:text-[#414752] focus:w-28 transition-all"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="w-6 h-6 rounded-full bg-[#e5eeff] flex items-center justify-center text-[#004e99] hover:bg-[#004e99] hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Media & Official Links */}
          <div className="flex flex-col gap-2 pt-1">
            <label className="text-xs font-semibold text-[#0b1c30]">
              Target Links & Profiles
            </label>

            {/* LinkedIn Page URL */}
            <div className="relative flex items-center bg-[#eff4ff] rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0a66c2]/40 border border-[#e5eeff]">
              <div className="absolute left-3 w-5 h-5 flex items-center justify-center text-[#0a66c2]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.37 9.74V9.97H5.09v8.53h2.74Z" />
                </svg>
              </div>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="linkedin.com/company/nexus-tech"
                className="w-full bg-transparent pl-10 pr-3 py-2.5 text-xs text-[#0b1c30] rounded-lg outline-none"
              />
            </div>

            {/* X / Twitter URL */}
            <div className="relative flex items-center bg-[#eff4ff] rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0a66c2]/40 border border-[#e5eeff]">
              <div className="absolute left-3 w-5 h-5 flex items-center justify-center text-[#0b1c30]">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <input
                type="text"
                value={twitterHandle}
                onChange={(e) => setTwitterHandle(e.target.value)}
                placeholder="@NexusTechEvents"
                className="w-full bg-transparent pl-10 pr-3 py-2.5 text-xs text-[#0b1c30] rounded-lg outline-none"
              />
            </div>

            {/* Website URL */}
            <div className="relative flex items-center bg-[#eff4ff] rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0a66c2]/40 border border-[#e5eeff]">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#454f60]">
                language
              </span>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://techpulse2025.io"
                className="w-full bg-transparent pl-10 pr-3 py-2.5 text-xs text-[#0b1c30] rounded-lg outline-none"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full h-11 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${
                saveSuccess
                  ? 'bg-[#006d3c] text-white'
                  : 'bg-[#0a66c2] hover:bg-[#004e99] text-white'
              }`}
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Updating Campaign...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Campaign Saved & Live!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>Save & Publish Event Campaign</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* QR Code Modal for Badge Scanning */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between">
              <span className="text-sm font-bold text-[#0b1c30]">Attendee Portal QR</span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="text-[#414752] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-[#414752] text-center">
              Display on keynote screens or conference badges for attendees to generate posts in 10 seconds.
            </p>
            {/* SVG QR Code Simulation */}
            <div className="p-4 bg-white border-2 border-[#0a66c2]/20 rounded-xl shadow-inner flex flex-col items-center justify-center">
              <div className="w-48 h-48 bg-[#f8f9ff] flex items-center justify-center rounded-lg border border-[#e5eeff] relative overflow-hidden">
                <div className="grid grid-cols-6 gap-1 p-3 w-full h-full opacity-90">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 && i % 3 === 0) || i % 7 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                          ? 'bg-[#004e99]'
                          : 'bg-[#dce9ff]'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-2 bg-white rounded-md shadow-md border border-[#d6e3ff]">
                    <span className="material-symbols-outlined text-[24px] text-[#0a66c2]">
                      ecg_heart
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center font-mono text-xs text-[#0a66c2] font-semibold">
              eventpulse.ai/attendee/techpulse25
            </div>
            <button
              type="button"
              onClick={() => {
                setShowQrModal(false);
                handleCopyPortalLink();
              }}
              className="w-full py-2 bg-[#0a66c2] text-white text-xs font-semibold rounded-lg hover:bg-[#004e99]"
            >
              Copy Link & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
