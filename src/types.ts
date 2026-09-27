export type TabType = 'prompt-workbench' | 'post-templates' | 'event-campaigns' | 'saved-drafts';

export type UserRole = 'organizer' | 'attendee';

export type NarrativeTone =
  | 'Grateful Attendee'
  | 'Professional'
  | 'Key Takeaway'
  | 'Speaker Shoutout'
  | 'Tech Deep Dive'
  | 'Casual & Excited';

export interface CampaignData {
  id: string;
  eventName: string;
  organizer: string;
  dateRange: string;
  location: string;
  status: string;
  campaignId: string;
  postsCreated: number;
  impressions: string;
  avgEngagement: string;
  attendeePortalUrl: string;
  hashtags: string[];
  linkedinUrl: string;
  twitterHandle: string;
  websiteUrl: string;
}

export interface PostState {
  keyTakeaways: string;
  selectedTone: NarrativeTone;
  mediaAsset: {
    name: string;
    url: string;
    aspectRatio: string;
    readyLabel: string;
  } | null;
  postContent: {
    hook: string;
    body: string;
    keyTakeawaysList: string[];
    closing: string;
    hashtags: string[];
  };
  metrics: {
    likes: number;
    comments: number;
    reposts: number;
    isLiked: boolean;
  };
}

export interface PostTemplate {
  id: string;
  title: string;
  tone: NarrativeTone;
  description: string;
  preview: string;
  takeawaysDefault: string;
}

export interface SavedDraft {
  id: string;
  title: string;
  tone: NarrativeTone;
  content: string;
  lastEdited: string;
  mediaName?: string;
  mediaUrl?: string;
  isReady: boolean;
}
