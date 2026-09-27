/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { CampaignsScreen } from './components/CampaignsScreen';
import { DraftsScreen } from './components/DraftsScreen';
import { GenerateScreen } from './components/GenerateScreen';
import { Header } from './components/Header';
import { ScheduleModal } from './components/ScheduleModal';
import { TemplatesScreen } from './components/TemplatesScreen';
import { Toast } from './components/Toast';
import { INITIAL_CAMPAIGN, INITIAL_DRAFTS, INITIAL_POST } from './data/initialData';
import {
  CampaignData,
  NarrativeTone,
  PostState,
  PostTemplate,
  SavedDraft,
  TabType,
  UserRole,
} from './types';
import { generatePostContent } from './utils/generator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('prompt-workbench');
  const [userRole, setUserRole] = useState<UserRole>('organizer');
  const [campaign, setCampaign] = useState<CampaignData>(INITIAL_CAMPAIGN);
  const [postState, setPostState] = useState<PostState>(INITIAL_POST);
  const [drafts, setDrafts] = useState<SavedDraft[]>(INITIAL_DRAFTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDesktopFrameMode, setIsDesktopFrameMode] = useState(false);

  // Show Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 2400);
  };

  // Handle role switch from header
  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'organizer') {
      setCurrentTab('event-campaigns');
      showToast('Switched to Organizer Campaign Dashboard');
    } else {
      setCurrentTab('prompt-workbench');
      showToast('Switched to Attendee Post Workbench');
    }
  };

  // Update campaign data
  const handleUpdateCampaign = (updated: Partial<CampaignData>) => {
    const newCamp = { ...campaign, ...updated };
    setCampaign(newCamp);

    // Also update generated post hashtags and context
    const regenerated = generatePostContent(
      postState.keyTakeaways,
      postState.selectedTone,
      newCamp
    );
    setPostState((prev) => ({
      ...prev,
      postContent: regenerated,
    }));
  };

  // Update post state in Workbench
  const handleUpdatePostState = (updated: Partial<PostState>) => {
    setPostState((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Load a template into the workbench
  const handleSelectTemplate = (template: PostTemplate) => {
    const updatedContent = generatePostContent(
      template.takeawaysDefault,
      template.tone,
      campaign
    );
    setPostState((prev) => ({
      ...prev,
      keyTakeaways: template.takeawaysDefault,
      selectedTone: template.tone,
      postContent: updatedContent,
    }));
    setCurrentTab('prompt-workbench');
  };

  // Save current post to drafts
  const handleSaveToDrafts = (
    content: string,
    tone: NarrativeTone,
    mediaName?: string
  ) => {
    const newDraft: SavedDraft = {
      id: `draft_${Date.now()}`,
      title: `${tone} Post - ${new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
      tone,
      content,
      lastEdited: 'Just now',
      mediaName,
      isReady: true,
    };
    setDrafts((prev) => [newDraft, ...prev]);
  };

  // Load draft into Workbench
  const handleLoadDraft = (draft: SavedDraft) => {
    setPostState((prev) => ({
      ...prev,
      keyTakeaways: draft.content.slice(0, 150),
      selectedTone: draft.tone,
      postContent: generatePostContent(draft.content, draft.tone, campaign),
    }));
    setCurrentTab('prompt-workbench');
  };

  // Delete draft
  const handleDeleteDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
    showToast('Draft removed');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col items-center">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onNotificationClick={() => showToast('All notifications caught up')}
      />

      {/* Main Content Area */}
      <main className="w-full pt-32 pb-20 flex-1 flex flex-col items-center justify-start">
        {/* Device Preview Toggle Bar on larger desktop screens */}
        <div className="hidden lg:flex items-center justify-between w-full max-w-md md:max-w-xl px-4 pb-2 text-[11px] text-[#414752]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006d3c]"></span>
            Active View: <strong className="text-[#0b1c30]">{currentTab}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDesktopFrameMode(!isDesktopFrameMode)}
              className="text-[#0a66c2] hover:underline flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[14px]">
                {isDesktopFrameMode ? 'fullscreen' : 'smartphone'}
              </span>
              <span>{isDesktopFrameMode ? 'Fluid View' : 'Phone Shell'}</span>
            </button>
          </div>
        </div>

        {/* Content Wrapper (with optional phone shell styling when toggled) */}
        <div
          className={`w-full transition-all duration-300 ${
            isDesktopFrameMode
              ? 'max-w-[420px] rounded-3xl shadow-2xl border-4 border-[#0b1c30] bg-[#f8f9ff] overflow-hidden my-4'
              : 'w-full'
          }`}
        >
          {currentTab === 'prompt-workbench' && (
            <GenerateScreen
              campaign={campaign}
              postState={postState}
              onUpdatePostState={handleUpdatePostState}
              onSaveToDrafts={handleSaveToDrafts}
              onOpenScheduler={() => setIsScheduleOpen(true)}
              showToast={showToast}
            />
          )}

          {currentTab === 'event-campaigns' && (
            <CampaignsScreen
              campaign={campaign}
              onUpdateCampaign={handleUpdateCampaign}
              onNavigateToGenerate={() => setCurrentTab('prompt-workbench')}
              showToast={showToast}
            />
          )}

          {currentTab === 'post-templates' && (
            <TemplatesScreen
              onSelectTemplate={handleSelectTemplate}
              showToast={showToast}
            />
          )}

          {currentTab === 'saved-drafts' && (
            <DraftsScreen
              drafts={drafts}
              onLoadDraft={handleLoadDraft}
              onDeleteDraft={handleDeleteDraft}
              onCreateNew={() => setCurrentTab('prompt-workbench')}
              showToast={showToast}
            />
          )}
        </div>
      </main>

      {/* Bottom Mobile Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          // Sync header role display when tapping campaigns vs generate
          if (tab === 'event-campaigns') {
            setUserRole('organizer');
          } else if (tab === 'prompt-workbench') {
            setUserRole('attendee');
          }
        }}
        draftsCount={drafts.length}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} isVisible={isToastVisible} />

      {/* Post Scheduler Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSchedule={(time) => {
          showToast(`Post scheduled for ${time}!`);
        }}
      />
    </div>
  );
}
