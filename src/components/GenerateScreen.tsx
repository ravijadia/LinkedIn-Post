import React, { useRef, useState } from 'react';
import { ASSETS } from '../data/initialData';
import { CampaignData, NarrativeTone, PostState } from '../types';
import { generatePostContent } from '../utils/generator';

interface GenerateScreenProps {
  campaign: CampaignData;
  postState: PostState;
  onUpdatePostState: (updated: Partial<PostState>) => void;
  onSaveToDrafts: (content: string, tone: NarrativeTone, mediaName?: string) => void;
  onOpenScheduler: () => void;
  showToast: (msg: string) => void;
}

export const GenerateScreen: React.FC<GenerateScreenProps> = ({
  campaign,
  postState,
  onUpdatePostState,
  onSaveToDrafts,
  onOpenScheduler,
  showToast,
}) => {
  const [takeaways, setTakeaways] = useState(postState.keyTakeaways);
  const [selectedTone, setSelectedTone] = useState<NarrativeTone>(postState.selectedTone);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likesCount, setLikesCount] = useState(postState.metrics.likes);
  const [isLiked, setIsLiked] = useState(postState.metrics.isLiked);
  const [commentsCount, setCommentsCount] = useState(postState.metrics.comments);
  const [repostsCount, setRepostsCount] = useState(postState.metrics.reposts);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [imgError, setImgError] = useState(false);
  const [mediaAsset, setMediaAsset] = useState(postState.mediaAsset);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tones: NarrativeTone[] = [
    'Professional',
    'Grateful Attendee',
    'Key Takeaway',
    'Speaker Shoutout',
    'Tech Deep Dive',
    'Casual & Excited',
  ];

  // Handle tone selection
  const handleToneChange = (tone: NarrativeTone) => {
    setSelectedTone(tone);
    const newContent = generatePostContent(takeaways, tone, campaign);
    onUpdatePostState({
      selectedTone: tone,
      postContent: newContent,
    });
    showToast(`Narrative tone switched to "${tone}"`);
  };

  // Handle Takeaways change
  const handleTakeawaysChange = (val: string) => {
    setTakeaways(val);
    const newContent = generatePostContent(val, selectedTone, campaign);
    onUpdatePostState({
      keyTakeaways: val,
      postContent: newContent,
    });
  };

  // Regenerate post
  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const newContent = generatePostContent(takeaways, selectedTone, campaign);
      onUpdatePostState({
        postContent: newContent,
      });
      setIsRegenerating(false);
      showToast('LinkedIn post synthesized with fresh tone hooks!');
    }, 650);
  };

  // Copy post text
  const handleCopyPost = () => {
    const p = postState.postContent;
    const fullText = `${p.hook}\n\n${p.body}\n\nKey takeaways:\n${p.keyTakeawaysList
      .map((k) => `• ${k}`)
      .join('\n')}\n\n${p.closing}\n\n${p.hashtags.join(' ')}`;

    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        setCopiedPost(true);
        showToast('Post copied to clipboard!');
        setTimeout(() => setCopiedPost(false), 2200);
      })
      .catch(() => {
        showToast('Post text ready to share!');
      });
  };

  // Open in LinkedIn share intent
  const handleOpenLinkedIn = () => {
    const p = postState.postContent;
    const fullText = `${p.hook}\n\n${p.body}\n\n${p.closing}\n\n${p.hashtags.join(' ')}`;
    const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
      fullText
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening LinkedIn Composer...');
  };

  // Handle media file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const asset = {
        name: file.name,
        url,
        aspectRatio: '16:9',
        readyLabel: 'Ready for feed (16:9)',
      };
      setMediaAsset(asset);
      onUpdatePostState({ mediaAsset: asset });
      showToast(`Uploaded ${file.name}`);
    }
  };

  // Remove media
  const handleRemoveMedia = () => {
    setMediaAsset(null);
    onUpdatePostState({ mediaAsset: null });
    showToast('Photo asset removed');
  };

  // Like interaction
  const toggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  // Repost interaction
  const handleRepost = () => {
    setRepostsCount((prev) => prev + 1);
    showToast('Simulated Repost to your LinkedIn network!');
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setCommentsCount((prev) => prev + 1);
    setCommentInput('');
    setShowCommentBox(false);
    showToast('Comment added to live preview!');
  };

  const p = postState.postContent;

  return (
    <div className="flex flex-col w-full px-4 pb-24 gap-4 max-w-md mx-auto md:max-w-xl">
      {/* Top Event Context Banner */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a66c2] via-[#004e99] to-[#006d3c]"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#97f7b6] text-[#00210e] text-[11px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006d3c] animate-pulse"></span>
              LIVE EVENT
            </span>
            <span className="text-[11px] text-[#414752] flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {campaign.dateRange}
            </span>
          </div>

          <h1 className="text-[18px] text-[#0b1c30] font-bold tracking-tight mt-0.5">
            {campaign.eventName}
          </h1>

          <p className="text-xs text-[#414752] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#004e99]">corporate_fare</span>
            Hosted by {campaign.organizer} • {campaign.location}
          </p>

          {/* Clickable Social & Event Tags Row */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1.5">
            <button
              type="button"
              onClick={() => showToast(`Linked to ${campaign.organizer} company page`)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] text-[#004e99] text-xs font-semibold transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              {campaign.organizer}
            </button>

            <button
              type="button"
              onClick={() => showToast(`Linked to ${campaign.twitterHandle}`)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] text-[#414752] text-xs font-medium transition-colors"
            >
              <span className="font-bold text-xs">𝕏</span>
              {campaign.twitterHandle}
            </button>

            <a
              href={campaign.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#e5eeff] text-[#414752] text-xs font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">language</span>
              {campaign.websiteUrl.replace(/^https?:\/\//, '')}
            </a>

            {campaign.hashtags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#d6e3ff] text-[#001b3d] text-[11px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Attendee Input Customization Panel (Section 1) */}
      <section className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#e5eeff] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0a66c2] text-white text-[11px] font-bold">
              1
            </span>
            <h2 className="text-[16px] text-[#0b1c30] font-bold">Customize Your Post</h2>
          </div>
          <span className="text-[11px] text-[#414752] flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[15px] text-[#006d3c]">verified</span>
            Auto-Context Active
          </span>
        </div>

        {/* Media Upload Zone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#414752]">Event Media Asset</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Interactive dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-lg p-4 bg-[#eff4ff] border-2 border-dashed border-[#dce9ff] flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer hover:bg-[#e5eeff]"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0a66c2]">
              <span className="material-symbols-outlined text-[22px]">cloud_upload</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#0b1c30] font-semibold">
                Drag & drop photos or Tap to Browse
              </span>
              <span className="text-[11px] text-[#414752]">
                Supports high-res JPG, PNG from keynote sessions
              </span>
            </div>
          </div>

          {/* Uploaded Asset Strip */}
          {mediaAsset && (
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#dce9ff]/60 mt-1 shadow-xs border border-[#d6e3ff]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-12 h-9 rounded bg-[#d3e4fe] overflow-hidden relative shrink-0 border border-white">
                  <img
                    src={mediaAsset.url}
                    alt={mediaAsset.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs text-[#0b1c30] font-semibold truncate">
                    {mediaAsset.name}
                  </span>
                  <span className="text-[11px] text-[#006d3c] flex items-center gap-0.5 font-medium">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    {mediaAsset.readyLabel}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveMedia}
                title="Remove photo"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#414752] hover:text-[#ba1a1a] hover:bg-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Key Highlights / Takeaways Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="takeaways-input" className="text-xs font-medium text-[#414752]">
              Key Highlights / Takeaways
            </label>
            <span className="text-[11px] text-[#414752] font-mono tabular-nums">
              {takeaways.length} / 3,000
            </span>
          </div>
          <div className="relative w-full">
            <textarea
              id="takeaways-input"
              rows={3}
              value={takeaways}
              maxLength={3000}
              onChange={(e) => handleTakeawaysChange(e.target.value)}
              placeholder="What stood out the most during the sessions?"
              className="w-full rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs p-3 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2]/40 border border-[#e5eeff] transition-all resize-none shadow-xs"
            />
          </div>
        </div>

        {/* Tone Selector Chips */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#414752]">Selected Narrative Tone</label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {tones.map((tone) => {
              const isSelected = selectedTone === tone;
              return (
                <button
                  key={tone}
                  type="button"
                  onClick={() => handleToneChange(tone)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all shrink-0 active:scale-95 ${
                    isSelected
                      ? 'bg-[#0a66c2] text-white shadow-xs font-semibold'
                      : 'bg-[#eff4ff] text-[#414752] hover:bg-[#e5eeff] hover:text-[#0b1c30]'
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                  {tone}
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          disabled={isRegenerating}
          onClick={handleRegenerate}
          className="w-full h-12 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] active:scale-[0.99] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span
            className={`material-symbols-outlined text-[20px] ${
              isRegenerating ? 'animate-spin' : ''
            }`}
          >
            auto_awesome
          </span>
          <span>
            {isRegenerating ? 'Synthesizing Key Insights...' : 'Regenerate LinkedIn Post'}
          </span>
        </button>
      </section>

      {/* Live Feed Simulator (Section 2) */}
      <section className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#97f7b6] text-[#00210e] text-[11px] font-bold">
              2
            </span>
            <h2 className="text-[16px] text-[#0b1c30] font-bold">Live LinkedIn Preview</h2>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#97f7b6]/30 text-[#007440] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006d3c]"></span>
            Auto-synced
          </span>
        </div>

        {/* Authentic LinkedIn Card Simulation */}
        <div className="w-full bg-white rounded-xl shadow-md border border-[#e5eeff] overflow-hidden flex flex-col">
          {/* Card Top Sub-banner */}
          <div className="px-4 pt-3 pb-1 flex items-center justify-between text-[#414752] text-[11px]">
            <span className="flex items-center gap-1 truncate">
              <span className="material-symbols-outlined text-[14px] text-[#004e99]">stars</span>
              Suggested by your network at{' '}
              <strong className="text-[#0b1c30] font-semibold">{campaign.eventName}</strong>
            </span>
            <button
              type="button"
              onClick={() => showToast('LinkedIn feed preferences')}
              className="text-[#414752] hover:text-[#0b1c30] p-1"
            >
              <span className="material-symbols-outlined text-[16px]">more_horiz</span>
            </button>
          </div>

          {/* Author Row */}
          <div className="px-4 py-2.5 flex items-start gap-3">
            <img
              src={ASSETS.profileElena}
              alt="Elena Rostova Profile"
              className="w-12 h-12 rounded-full object-cover shrink-0 shadow-xs border border-white"
            />
            <div className="flex flex-col min-w-0 flex-1 leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-sm text-[#0b1c30] font-bold truncate">Elena Rostova</span>
                <span className="text-[#414752] text-[11px] font-semibold">• 1st</span>
              </div>
              <span className="text-xs text-[#414752] truncate">
                Staff Product Designer • AI & Systems
              </span>
              <div className="flex items-center gap-1 text-[#414752] text-[11px] mt-0.5">
                <span>Just now</span>
                <span>• Edited •</span>
                <span className="material-symbols-outlined text-[13px]">public</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsFollowing(!isFollowing);
                showToast(isFollowing ? 'Unfollowed Elena' : 'Following Elena Rostova');
              }}
              className="text-[#0a66c2] text-xs font-bold hover:underline flex items-center gap-0.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isFollowing ? 'check' : 'add'}
              </span>
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </button>
          </div>

          {/* Post Body Copy */}
          <div className="px-4 py-1.5 flex flex-col text-xs text-[#0b1c30] gap-2.5 leading-relaxed">
            <p className="font-medium">
              {p.hook.includes('#') ? (
                <span>
                  {p.hook.split(/(#[a-zA-Z0-9_]+)/g).map((part, i) =>
                    part.startsWith('#') ? (
                      <span key={i} className="text-[#0a66c2] font-semibold hover:underline">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </span>
              ) : (
                p.hook
              )}
            </p>

            <p>
              {p.body.includes(campaign.organizer) ? (
                <>
                  {p.body.split(campaign.organizer)[0]}
                  <span className="text-[#0a66c2] font-semibold hover:underline">
                    {campaign.organizer}
                  </span>
                  {p.body.split(campaign.organizer)[1]}
                </>
              ) : (
                p.body
              )}
            </p>

            {/* Key takeaways highlighted box */}
            {p.keyTakeawaysList && p.keyTakeawaysList.length > 0 && (
              <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff]/60 flex flex-col gap-1 text-[#0b1c30]">
                <span className="text-xs font-bold text-[#0b1c30]">Key takeaways:</span>
                {p.keyTakeawaysList.map((item, idx) => (
                  <span key={idx} className="flex items-start gap-1.5 text-xs text-[#0b1c30]">
                    <span className="text-[#004e99] font-bold">🔹</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}

            <p>{p.closing}</p>

            <div className="text-[#0a66c2] font-semibold text-xs flex flex-wrap gap-1.5">
              {p.hashtags.map((tag) => (
                <span key={tag} className="hover:underline cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Embedded Keynote Media Photo */}
          {mediaAsset && (
            <div className="w-full mt-2 bg-[#d3e4fe] overflow-hidden relative">
              <img
                src={mediaAsset.url}
                alt="TechPulse Keynote Stage presentation"
                className="w-full h-auto object-cover max-h-72"
              />
            </div>
          )}

          {/* Reaction Metatags Row */}
          <div className="px-4 py-2 flex items-center justify-between text-[#414752] text-[11px] bg-white border-t border-[#e5eeff]/50">
            <button
              type="button"
              onClick={toggleLike}
              className="flex items-center gap-1.5 hover:underline"
            >
              <div className="flex -space-x-1 items-center">
                <span className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center text-[9px] text-white">
                  👍
                </span>
                <span className="w-4 h-4 rounded-full bg-[#006d3c] flex items-center justify-center text-[9px] text-white">
                  👏
                </span>
                <span className="w-4 h-4 rounded-full bg-[#ba1a1a] flex items-center justify-center text-[9px] text-white">
                  ❤️
                </span>
              </div>
              <span className="text-[#414752] font-medium">
                {isLiked ? 'You and ' + (likesCount - 1) + ' others' : likesCount + ' others'}
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCommentBox(!showCommentBox)}
                className="hover:underline"
              >
                {commentsCount} comments
              </button>
              <span>•</span>
              <button type="button" onClick={handleRepost} className="hover:underline">
                {repostsCount} reposts
              </button>
            </div>
          </div>

          {/* Interactive Comment Input (expandable) */}
          {showCommentBox && (
            <form onSubmit={handleAddComment} className="px-3 py-2 bg-[#eff4ff] flex gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Add a comment to this preview..."
                className="flex-1 px-3 py-1.5 bg-white text-xs rounded-lg border border-[#dce9ff] outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#0a66c2] text-white text-xs font-semibold rounded-lg hover:bg-[#004e99]"
              >
                Post
              </button>
            </form>
          )}

          {/* Engagement Interaction Controls */}
          <div className="px-2 py-1 bg-white flex items-center justify-around border-t border-[#e5eeff]">
            <button
              type="button"
              onClick={toggleLike}
              className="flex-1 py-2 flex items-center justify-center gap-1.5 text-[#414752] hover:bg-[#eff4ff] rounded-lg transition-colors text-xs font-semibold"
            >
              <span
                className={`material-symbols-outlined text-[19px] ${
                  isLiked ? 'text-[#0a66c2]' : 'text-[#414752]'
                }`}
                style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                thumb_up
              </span>
              <span className={isLiked ? 'text-[#0a66c2]' : ''}>
                {isLiked ? 'Liked' : 'Like'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="flex-1 py-2 flex items-center justify-center gap-1.5 text-[#414752] hover:bg-[#eff4ff] rounded-lg transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[19px]">chat_bubble_outline</span>
              <span>Comment</span>
            </button>

            <button
              type="button"
              onClick={handleRepost}
              className="flex-1 py-2 flex items-center justify-center gap-1.5 text-[#414752] hover:bg-[#eff4ff] rounded-lg transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[19px]">repeat</span>
              <span>Repost</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPost}
              className="flex-1 py-2 flex items-center justify-center gap-1.5 text-[#414752] hover:bg-[#eff4ff] rounded-lg transition-colors text-xs font-semibold"
            >
              <span className="material-symbols-outlined text-[19px]">send</span>
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Quick Action / Sharing Button Bar */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopyPost}
            className={`h-11 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 border ${
              copiedPost
                ? 'bg-[#97f7b6] text-[#00210e] border-[#006d3c]'
                : 'bg-white hover:bg-[#eff4ff] text-[#0a66c2] border-[#e5eeff]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedPost ? 'done' : 'content_copy'}
            </span>
            <span>{copiedPost ? 'Copied to Clipboard!' : 'Copy Post Text'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenLinkedIn}
            className="h-11 px-3 rounded-lg bg-[#0a66c2] hover:bg-[#004e99] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>Open in LinkedIn</span>
          </button>
        </div>

        {/* Save Draft Action link */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              const p = postState.postContent;
              const fullText = `${p.hook}\n\n${p.body}\n\n${p.closing}\n\n${p.hashtags.join(' ')}`;
              onSaveToDrafts(fullText, selectedTone, mediaAsset?.name);
              showToast('Post saved to Drafts!');
            }}
            className="text-xs font-semibold text-[#004e99] hover:text-[#0a66c2] hover:underline flex items-center gap-1 py-1"
          >
            <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
            <span>Save as Draft for later</span>
          </button>
        </div>

        {/* Micro Feedback Banner */}
        <div className="w-full p-3 bg-[#eff4ff] rounded-lg border border-[#dce9ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006d3c] text-[18px]">
              workspace_premium
            </span>
            <span className="text-xs text-[#0b1c30]">
              Optimal post time: <strong>Today, 4:15 PM PST</strong> (Peak SF tech engagement)
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenScheduler}
            className="text-[11px] text-[#004e99] font-bold hover:underline shrink-0"
          >
            Schedule
          </button>
        </div>
      </section>
    </div>
  );
};
