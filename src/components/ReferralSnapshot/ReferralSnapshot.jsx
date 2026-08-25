import { Users, Gift, Zap, Copy, Check } from "lucide-react";
import styles from "./ReferralSnapshot.module.css";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export default function ReferralSnapshot({ referral }) {
  const { copied, copy } = useCopyToClipboard();
  const hasReferrals = referral.totalReferrals > 0;
  const remaining = referral.milestoneTarget - referral.totalReferrals;
  const progressPercent = Math.min(
    Math.round((referral.totalReferrals / referral.milestoneTarget) * 100),
    100
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Referral Snapshot</h2>

      {!hasReferrals ? (
        <div className={styles.emptyState}>
          <Users size={28} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No Referral Activity</p>
          <p className={styles.emptyText}>
            Start sharing your referral link to build your network.
          </p>
          <button className={styles.emptyCta}>Refer a Friend →</button>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.codeRow}>
            <span className={styles.codeLabel}>Referral Code</span>
            <div className={styles.codeValueWrap}>
              <span className={styles.codeValue}>{referral.code}</span>
              <button
                className={styles.copyBtn}
                onClick={() => copy(referral.code)}
                aria-label="Copy referral code"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            {copied && <span className={styles.copiedToast}>Copied!</span>}
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <Users size={16} className={styles.statIcon} />
              <div>
                <p className={styles.statValue}>{referral.totalReferrals}</p>
                <p className={styles.statLabel}>Total Referrals</p>
              </div>
            </div>
            <div className={styles.stat}>
              <Gift size={16} className={styles.statIcon} />
              <div>
                <p className={styles.statValue}>{referral.referralRewards}</p>
                <p className={styles.statLabel}>Referral Rewards</p>
              </div>
            </div>
            <div className={styles.stat}>
              <Zap size={16} className={styles.statIcon} />
              <div>
                <p className={styles.statValue}>+{referral.referralXP} XP</p>
                <p className={styles.statLabel}>Referral XP</p>
              </div>
            </div>
          </div>

          <div className={styles.milestoneBlock}>
            <div className={styles.milestoneLabelRow}>
              <span>Referral Milestone</span>
              <span className={styles.milestoneCount}>
                {referral.totalReferrals} / {referral.milestoneTarget}
              </span>
            </div>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: `${progressPercent}%` }} />
            </div>
            {remaining > 0 && (
              <p className={styles.milestoneHint}>
                {remaining} more referral{remaining !== 1 ? "s" : ""} to next milestone
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}