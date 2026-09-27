import { CampaignData, NarrativeTone, PostState, PostTemplate, SavedDraft } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VQWAqx4a84LkfpAtIoT1Hvw_rVzwF0m1Ybpvom3RsI2XG5V4Tkm8fdtdUSchDV95D3iR2tdB0p1qJQAUXUbfqE3eJACTHHH0tvhU42IWoQtTOwHe2Is5X1Qmo-E-aF6lNmDRo8dfHAT8rKa_7mmceAbRvofwO0DQG8mzJcMeMcj2AaevIYwBr2LJNRCdKiJvdnJJo6LGdTdUdtz0yB6iB4jqYRmIhZ8FJnv6wT8pvDK0MGb5lSa1L0kg',
  profileElena: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtoyfY-0hqZWu_cYCd5zFqrXpTxyJJ_VesXc4vkCypMWEx3fh2sIYCKkVyeB_W8Oay9Erpn8tSO24Afr7kTnkS3e9nWdQNBPG4ZNLsolUN3qI_XqP8Rh93HYmQMnJhcElwxxcX6HTxr8HQ3dHIg2QDNg8FaNd0i9WeyUpewKpsmSt8AAKX3JwSIpG_XeR9ATKDdGWROuYrOa4GeZBQ9SviJzPjaSW8hZgmvpY2viz_hbaCrNYliJsJ',
  stageKeynote: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv36uwhNbpGfwBYPTOAJADdbDFC1FOvR6WFqjaDJL0XsjaeCfyILvvOMbGLk8Kq9LBZDfF70ai3EdHxytFsspbAlcf5_TX_9cVJB8mW3MrWmvFR3fP8RfB7yoJtYL7JK9kdZwQCYNaZ7Xe4RmNozvgYRpEqge61qNf8YwWjUVODTkGaGHZwFdvRmyB7Z4mEqVBCU8mcXz5WIICYkkrVaWWNmexQmBB-9_KtHGifxEn5GMOUKkGJSRK',
  stageThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAufsqUuQov6W-mGpAc3P3X7KIQoBTaxXFiODlAUdNe314AddH3J1Udbkl-CdX5n-_whI0khIj0uIA3XkBv0pdWx9nsFokLEARefdtiSXmriVlJoaWdQbrB0EI956Rdk6ZVAuxkdUJZp4APaY2S1fhJTPtEvxKZ_jJSvMgUJ_L2QAHnLR8xPra62vv1O4xGXXX12pxfjImev--cBHmY9_dpWgyrMfXXk8FWdf4m-DQKbid88qjYxVso',
};

export const INITIAL_CAMPAIGN: CampaignData = {
  id: 'camp_techpulse_2025',
  eventName: 'TechPulse Global Summit 2025',
  organizer: 'Nexus Tech Ventures',
  dateRange: 'Nov 14–16, 2025',
  location: 'Moscone Center, SF & Hybrid',
  status: 'Registration Open',
  campaignId: 'TP-2025-V3',
  postsCreated: 1248,
  impressions: '86.4K',
  avgEngagement: '4.8%',
  attendeePortalUrl: 'eventpulse.ai/attendee/techpulse25',
  hashtags: ['#TechPulse2025', '#AIInnovation', '#CloudTech', '#Networking'],
  linkedinUrl: 'linkedin.com/company/nexus-tech',
  twitterHandle: '@NexusTechEvents',
  websiteUrl: 'https://techpulse2025.io',
};

export const INITIAL_POST: PostState = {
  keyTakeaways: "Incredible keynote on agentic AI architectures! Met brilliant minds in distributed systems and learned so much from Sarah Chen's session.",
  selectedTone: 'Grateful Attendee',
  mediaAsset: {
    name: 'stage_keynote.jpg',
    url: ASSETS.stageKeynote,
    aspectRatio: '16:9',
    readyLabel: 'Ready for feed (16:9)',
  },
  postContent: {
    hook: 'Still energized by Day 1 at #TechPulse2025! 🚀',
    body: "Huge thank you to Nexus Tech Ventures for curating such a forward-thinking conference. Sarah Chen's keynote on agentic workflows and decentralized AI completely shifted my perspective on product architecture.",
    keyTakeawaysList: [
      'Systems are shifting from prompt-based to autonomous agent loops',
      'Context orchestration is the new database layer',
    ],
    closing: 'Grateful to connect with so many visionary engineers and designers here in SF!',
    hashtags: ['#AIInnovation', '#CloudTech', '#Networking', '#TechPulse2025'],
  },
  metrics: {
    likes: 43,
    comments: 8,
    reposts: 3,
    isLiked: true,
  },
};

export const POST_TEMPLATES: PostTemplate[] = [
  {
    id: 'tpl_grateful',
    title: 'Grateful Attendee',
    tone: 'Grateful Attendee',
    description: 'Praise the event organizers, highlight top moments, and express genuine gratitude.',
    preview: 'Still energized by Day 1 at #TechPulse2025! 🚀 Huge thank you to the organizers...',
    takeawaysDefault: 'Incredible keynote on agentic AI architectures! Met brilliant minds in distributed systems and learned so much from Sarah Chen\'s session.',
  },
  {
    id: 'tpl_takeaways',
    title: 'Top 3 Key Takeaways',
    tone: 'Key Takeaway',
    description: 'Structured breakdown of actionable lessons, tech shifts, and architecture takeaways.',
    preview: '3 core insights from the TechPulse Global Summit that are shaping our Q4 roadmap...',
    takeawaysDefault: '1. Autonomous agents replace linear prompt engineering. 2. Real-time context routing beats fine-tuning. 3. Edge inference latency has dropped below 15ms.',
  },
  {
    id: 'tpl_speaker',
    title: 'Speaker Spotlight & Quote',
    tone: 'Speaker Shoutout',
    description: 'Focus on a standout keynote speaker, quote their biggest insight, and tag their work.',
    preview: '"Context orchestration is the new database layer" — mind blown by Sarah Chen at #TechPulse2025...',
    takeawaysDefault: 'Sarah Chen\'s talk on decentralized AI architecture completely redefined how we think about product resilience.',
  },
  {
    id: 'tpl_professional',
    title: 'Executive / Industry Outlook',
    tone: 'Professional',
    description: 'High-level synthesis for senior leaders, focused on business impact and tech convergence.',
    preview: 'Attending TechPulse 2025 confirms what many in tech leadership have anticipated: the shift from experimental AI to mission-critical infrastructure...',
    takeawaysDefault: 'Enterprise adoption is accelerating into production agent swarms. Governance and observability are now the primary bottlenecks.',
  },
  {
    id: 'tpl_networking',
    title: 'Networking & Community',
    tone: 'Casual & Excited',
    description: 'Celebrate meeting peers, fellow engineers, and founders at the summit.',
    preview: 'The best part of #TechPulse2025 isn\'t just the tech—it\'s the incredible community here in San Francisco...',
    takeawaysDefault: 'Had unbelievable conversations over coffee about local-first models and the future of creative tools.',
  },
  {
    id: 'tpl_deepdive',
    title: 'Tech Deep Dive / Architecture',
    tone: 'Tech Deep Dive',
    description: 'For engineers and builders sharing technical breakthroughs, benchmarks, and stack decisions.',
    preview: 'Deep diving into the technical tracks at #TechPulse2025. Here is the architectural paradigm shift happening under the hood...',
    takeawaysDefault: 'Benchmark comparisons revealed multi-modal agent clusters outperforming monolithic LLMs by 3.2x on complex reasoning.',
  },
];

export const INITIAL_DRAFTS: SavedDraft[] = [
  {
    id: 'draft_1',
    title: 'Day 1 Keynote Reactions',
    tone: 'Grateful Attendee',
    content: 'Still energized by Day 1 at #TechPulse2025! 🚀 Huge thank you to Nexus Tech Ventures for curating such a forward-thinking conference. Sarah Chen\'s keynote on agentic workflows and decentralized AI completely shifted my perspective...',
    lastEdited: 'Just now',
    mediaName: 'stage_keynote.jpg',
    mediaUrl: ASSETS.stageKeynote,
    isReady: true,
  },
  {
    id: 'draft_2',
    title: 'Autonomous Agents 3 Insights',
    tone: 'Key Takeaway',
    content: '3 non-obvious architecture shifts from the morning keynote at #TechPulse2025: 1. Context engines are superseding prompt wrappers. 2. Edge latency is no longer a blocker...',
    lastEdited: '2 hours ago',
    mediaName: 'presentation_slide.png',
    isReady: true,
  },
  {
    id: 'draft_3',
    title: 'Shoutout to Nexus Tech Team',
    tone: 'Speaker Shoutout',
    content: 'Kudos to the organizing committee at Nexus Tech Ventures. The hybrid experience, lightning demos, and speaker lineup are truly world class. #TechPulse2025',
    lastEdited: 'Yesterday',
    isReady: false,
  },
];
