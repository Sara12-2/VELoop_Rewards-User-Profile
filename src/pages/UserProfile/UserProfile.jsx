import { useState, useEffect, useCallback } from "react";
import { Trophy } from "lucide-react";
import ProfileHero from "../../components/ProfileHero/ProfileHero";
import ProfileIdentity from "../../components/ProfileIdentity/ProfileIdentity";
import RewardAssets from "../../components/RewardAssets/RewardAssets";
import LevelProgress from "../../components/LevelProgress/LevelProgress";
import { CurrentAchievement, NextAchievement } from "../../components/AchievementCard/AchievementCard";
import WithdrawalOverview from "../../components/WithdrawalOverview/WithdrawalOverview";
import QuickActions from "../../components/QuickActions/QuickActions";
import ReferralSnapshot from "../../components/ReferralSnapshot/ReferralSnapshot";
import RecentActivity from "../../components/RecentActivity/RecentActivity";
import AccountInformation from "../../components/AccountInformation/AccountInformation";
import ProfileSkeleton from "../../components/ProfileSkeleton/ProfileSkeleton";
import ProfileEmptyState from "../../components/ProfileEmptyState/ProfileEmptyState";

import { userData } from "../../data/userData";
import { rewardsData, achievements } from "../../data/rewardsData";
import { withdrawalData } from "../../data/withdrawalData";
import { activityData, referralData } from "../../data/activityData";

import styles from "./UserProfile.module.css";

function fetchProfileData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const simulateError = false;
      if (simulateError) {
        reject(new Error("Network error"));
      } else {
        resolve({
          user: userData,
          rewards: rewardsData,
          achievements,
          withdrawals: withdrawalData,
          activity: activityData,
          referral: referralData,
        });
      }
    }, 1000);
  });
}

export default function UserProfile() {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState(null);

  const fetchData = useCallback(() => {
    fetchProfileData()
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = () => {
    setStatus("loading");
    fetchData();
  };

  const handleViewAchievements = () => {
    console.log("View Achievements clicked");
  };

  const handleQuickAction = (actionId) => {
    console.log("Quick action clicked:", actionId);
    switch(actionId) {
      case 'gems':
        console.log('Navigate to Gems page');
        break;
      case 'rewards':
        console.log('Navigate to Rewards page');
        break;
      case 'ads':
        console.log('Navigate to Ads page');
        break;
      case 'refer':
        console.log('Navigate to Referral page');
        break;
      case 'redeem':
        console.log('Navigate to Redeem page');
        break;
      case 'achievements':
        console.log('Navigate to Achievements page');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleRewardAction = (assetId) => {
    console.log("Reward asset clicked:", assetId);
    switch(assetId) {
      case 'ves':
        console.log('Navigate to VEs Wallet');
        break;
      case 'sves':
        console.log('Navigate to SVEs Conversion');
        break;
      case 'gems':
        console.log('Navigate to Gems Store');
        break;
      case 'tokens':
        console.log('Navigate to Tokens Market');
        break;
      case 'xp':
        console.log('Navigate to XP Progress');
        break;
      default:
        console.log('Unknown asset:', assetId);
    }
  };

  const handleReferralAction = (actionId) => {
    console.log("Referral action:", actionId);
  };

  const handleActivityAction = (actionId) => {
    console.log("Activity action:", actionId);
  };

  if (status === "loading") {
    return <ProfileSkeleton />;
  }

  if (status === "error") {
    return (
      <div className={styles.pageContainer}>
        <ProfileEmptyState
          variant="error"
          title="Unable to Load Profile"
          message="We couldn't load your profile information right now."
          ctaLabel="Try Again"
          onCta={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.profileWrapper}>
        
        {/* ============================================
            ROW 1: Profile Hero - Full Width
            ============================================ */}
        <ProfileHero 
          user={data.user} 
          xp={data.rewards.xp} 
        />

        {/* ============================================
            ROW 2: Level Progress - Full Width
            ============================================ */}
        <LevelProgress xp={data.rewards.xp} />

        {/* ============================================
            ROW 3: Two Column - Identity + Rewards
            ============================================ */}
        <div className={styles.twoCol}>
          <div className={styles.leftColumn}>
            <ProfileIdentity
              user={data.user}
              level={data.rewards.xp.level}
              levelName={data.rewards.xp.levelName}
              memberSince={data.user.memberSince}
            />
          </div>
          <div className={styles.rightColumn}>
            <RewardAssets 
              rewards={data.rewards} 
              onAction={handleRewardAction}
            />
          </div>
        </div>

        {/* ============================================
            ROW 4: Withdrawal Overview - Full Width
            ============================================ */}
        <WithdrawalOverview withdrawals={data.withdrawals} />

        {/* ============================================
            ROW 5: Achievements - One Box Side by Side
            ============================================ */}
        <div className={styles.achievementsWrapper}>
          <div className={styles.achievementsHeader}>
            <div className={styles.achievementsHeaderLeft}>
              <div className={styles.achievementsHeaderIcon}>
                <Trophy size={18} />
              </div>
              <h3 className={styles.achievementsTitle}>Achievements</h3>
              <span className={styles.achievementsBadge}>
                {data.achievements.current.unlocked ? '1 Unlocked' : '0 Unlocked'}
              </span>
            </div>
          </div>
          <div className={styles.achievementsGrid}>
            <CurrentAchievement 
              achievement={data.achievements.current} 
              onViewAll={handleViewAchievements} 
            />
            <NextAchievement 
              achievement={data.achievements.next} 
            />
          </div>
        </div>

        {/* ============================================
            ROW 6: Quick Actions - Full Width
            ============================================ */}
        <QuickActions onAction={handleQuickAction} />

        {/* ============================================
            ROW 7: Two Column - Referral + Activity
            ============================================ */}
        <div className={styles.twoCol}>
          <ReferralSnapshot 
            referrals={data.referral} 
            onAction={handleReferralAction}
          />
          <RecentActivity 
            activities={data.activity} 
            onAction={handleActivityAction}
          />
        </div>

        {/* ============================================
            ROW 8: Account Information - Full Width
            ============================================ */}
        <AccountInformation user={data.user} />

      </div>
    </div>
  );
}