import { CampaignData, NarrativeTone, PostState } from '../types';

export function generatePostContent(
  takeaways: string,
  tone: NarrativeTone,
  campaign: CampaignData
): PostState['postContent'] {
  const cleanTakeaways = takeaways.trim() || 'Incredible sessions and visionary speakers!';
  const primaryTag = campaign.hashtags[0] || '#Event';
  const remainingTags = campaign.hashtags.slice(1);
  const orgName = campaign.organizer;
  const eventName = campaign.eventName;

  // Split takeaways into bullet points if they contain periods, numbers, or newlines
  const rawBullets = cleanTakeaways
    .split(/\n|\.\s+|\d+\.\s+/)
    .map((s) => s.trim().replace(/^[-*•\d.]\s*/, ''))
    .filter((s) => s.length > 5);

  const fallbackBullets = [
    'Systems are shifting from prompt-based to autonomous agent loops',
    'Context orchestration is the new database layer',
  ];

  const bulletList = rawBullets.length >= 1 ? rawBullets.slice(0, 3) : fallbackBullets;

  switch (tone) {
    case 'Grateful Attendee':
      return {
        hook: `Still energized by Day 1 at ${primaryTag}! 🚀`,
        body: `Huge thank you to ${orgName} for curating such a forward-thinking conference at ${eventName}. Sarah Chen's keynote on agentic workflows and decentralized AI completely shifted my perspective on product architecture.`,
        keyTakeawaysList: bulletList,
        closing: `Grateful to connect with so many visionary engineers and designers here!`,
        hashtags: Array.from(new Set([...remainingTags, primaryTag])),
      };

    case 'Professional':
      return {
        hook: `Key reflections from leadership sessions at ${eventName}:`,
        body: `Attending ${eventName} hosted by ${orgName}. The core dialogue across enterprise innovators centers around moving from experimental AI prototypes to robust, resilient production workflows.`,
        keyTakeawaysList: bulletList,
        closing: `Looking forward to applying these frameworks with our team this quarter.`,
        hashtags: Array.from(new Set([...campaign.hashtags, '#Leadership', '#TechStrategy'])),
      };

    case 'Key Takeaway':
      return {
        hook: `3 pivotal architecture shifts I observed at ${primaryTag}:`,
        body: `If you weren't able to attend ${eventName} today, here is the distillation of the most actionable insights from the technical tracks curated by ${orgName}:`,
        keyTakeawaysList: bulletList,
        closing: `Which of these shifts is impacting your roadmap the most right now?`,
        hashtags: Array.from(new Set([...campaign.hashtags, '#SoftwareEngineering', '#Innovation'])),
      };

    case 'Speaker Shoutout':
      return {
        hook: `Standout moment from ${primaryTag} on the main stage! 💡`,
        body: `Sarah Chen's keynote at ${eventName} was a masterclass in clarity and vision. Special commendation to ${orgName} for assembling speakers who push the frontier rather than recount yesterday's news.`,
        keyTakeawaysList: bulletList,
        closing: `Make sure to catch the session recordings if you're attending hybrid!`,
        hashtags: Array.from(new Set([...campaign.hashtags, '#KeynoteSpeaker', '#ThoughtLeadership'])),
      };

    case 'Tech Deep Dive':
      return {
        hook: `Under the hood at ${eventName}: What modern infrastructure actually looks like in 2025.`,
        body: `Fascinating breakdown at ${primaryTag} by the engineering team at ${orgName}. The transition from synchronous request-response systems to distributed agent coordination layers is happening faster than anticipated.`,
        keyTakeawaysList: bulletList,
        closing: `Detailed benchmark review coming soon. Connect if you are working on similar distributed topologies!`,
        hashtags: Array.from(new Set([...campaign.hashtags, '#DistributedSystems', '#Architecture'])),
      };

    case 'Casual & Excited':
      return {
        hook: `Hands down the most energizing conference of the year! 🙌`,
        body: `Having the best time at ${eventName} in SF! So many inspiring conversations, lightning talks, and reunions with friends in the tech community. Massive props to ${orgName} for putting together such an epic experience.`,
        keyTakeawaysList: bulletList,
        closing: `Drop a comment or DM if you're on the ground—would love to grab a coffee! ☕`,
        hashtags: Array.from(new Set([...campaign.hashtags, '#Community', '#TechMeetup'])),
      };

    default:
      return {
        hook: `Highlights from ${eventName} hosted by ${orgName}:`,
        body: cleanTakeaways,
        keyTakeawaysList: bulletList,
        closing: `Excited for what's next! ${primaryTag}`,
        hashtags: campaign.hashtags,
      };
  }
}
