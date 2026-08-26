import { useState, useEffect } from 'react';
import {
  Users, Gift, Copy, Check, TrendingUp, Zap,
  Share2, Award, Target, Sparkles, Crown,
  ChevronRight, UserPlus, Star
} from 'lucide-react';
import styles from './ReferralSnapshot.module.css';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const ReferralSnapshot = ({ referrals, onAction }) => {
  const { copy } = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const {
    code = 'VELOOP123',
    total = 0,
    rewards = '0 VEs',
    xpBonus = '+0 XP',
    milestone = 0,
    milestoneTarget = 25
  } = referrals || {};

  const percent = Math.min(Math.round((milestone / milestoneTarget) * 100), 100);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedPercent(percent);
    }, 400);
    return () => clearTimeout(timer);
  }, [percent]);

  const handleCopy = (text) => {
    copy(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMilestoneMessage = () => {
    const remaining = milestoneTarget - milestone;
    if (remaining <= 0) return '🎉 Milestone Complete!';
    if (remaining <= 3) return `${remaining} more to go!`;
    if (remaining <= 7) return `${remaining} more to next milestone`;
    return `${remaining} more referrals needed`;
  };

  const getProgressIcon = () => {
    if (percent >= 100) return <Crown size={16} />;
    if (percent >= 75) return <Sparkles size={16} />;
    if (percent >= 50) return <Star size={16} />;
    return <Target size={16} />;
  };

  return (
    <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.backgroundGlow}></div>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Share2 size={18} />
          </div>
          <h3 className={styles.title}>Referral Snapshot</h3>
          <span className={styles.headerBadge}>
            <UserPlus size={10} />
            {total} Referrals
          </span>
        </div>
        <button className={styles.viewAllBtn}>
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Referral Code */}
      <div className={styles.referralCodeCard}>
        <div className={styles.codeLabel}>
          <Users size={14} />
          <span>Your Referral Code</span>
        </div>
        <div className={styles.codeWrapper}>
          <span className={styles.codeValue}>{code}</span>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ''}`}
            onClick={() => handleCopy(code)}
            aria-label="Copy referral code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className={styles.copyTooltip}>
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>
        <div className={styles.codeShare}>
          <button className={styles.shareBtn}>
            <Share2 size={14} />
            Share Link
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Users size={18} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{total}</span>
            <span className={styles.statLabel}>Total Referrals</span>
          </div>
          <div className={styles.statTrend}>
            <TrendingUp size={12} />
            <span>+2 this month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Gift size={18} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{rewards}</span>
            <span className={styles.statLabel}>Referral Rewards</span>
          </div>
          <div className={styles.statBadge}>
            <Sparkles size={10} />
            Earned
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <Zap size={18} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{xpBonus}</span>
            <span className={styles.statLabel}>Referral XP</span>
          </div>
          <div className={styles.statBadge}>
            <Award size={10} />
            Bonus
          </div>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className={styles.milestoneCard}>
        <div className={styles.milestoneHeader}>
          <div className={styles.milestoneTitle}>
            <Target size={16} className={styles.milestoneIcon} />
            <span>Referral Milestone</span>
          </div>
          <span className={styles.milestoneCount}>
            {milestone} / {milestoneTarget}
          </span>
        </div>

        <div className={styles.milestoneTrack}>
          <div 
            className={`${styles.milestoneFill} ${animatedPercent > 0 ? styles.milestoneFillAnimated : ''}`}
            style={{ width: `${animatedPercent}%` }}
          >
            <div className={styles.milestoneFillGlow}></div>
          </div>
          <div 
            className={styles.milestoneGlowTrail}
            style={{ width: `${animatedPercent}%` }}
          ></div>
        </div>

        <div className={styles.milestoneFooter}>
          <div className={styles.milestoneMessage}>
            {getProgressIcon()}
            <span>{getMilestoneMessage()}</span>
          </div>
          <span className={styles.milestonePercent}>{percent}%</span>
        </div>

        {/* Milestone markers */}
        <div className={styles.milestoneMarkers}>
          <div className={styles.marker} style={{ left: '25%' }}>
            <span className={styles.markerDot}></span>
            <span className={styles.markerLabel}>25%</span>
          </div>
          <div className={styles.marker} style={{ left: '50%' }}>
            <span className={styles.markerDot}></span>
            <span className={styles.markerLabel}>50%</span>
          </div>
          <div className={styles.marker} style={{ left: '75%' }}>
            <span className={styles.markerDot}></span>
            <span className={styles.markerLabel}>75%</span>
          </div>
          <div className={`${styles.marker} ${styles.markerFinal}`} style={{ left: '100%' }}>
            <span className={styles.markerDot}></span>
            <span className={styles.markerLabel}>
              <Crown size={10} />
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        className={styles.referActionBtn}
        onClick={() => onAction?.('refer')}
      >
        <UserPlus size={16} />
        <span>Refer a Friend</span>
        <ChevronRight size={16} />
      </button>
    </section>
  );
};

export default ReferralSnapshot;