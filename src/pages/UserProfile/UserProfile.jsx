import { useState, useEffect, useCallback } from "react";
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

// ✅ Correct imports - check the paths
import { userData } from "../../data/userData";
import { rewardsData, achievements } from "../../data/rewardsData";
import { withdrawalData } from "../../data/withdrawalData";
import { activityData, referralData } from "../../data/activityData";

import styles from "./UserProfile.module.css";

// ... rest of the code

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
    // Navigate to achievements page or show modal
  };

  const handleQuickAction = (actionId) => {
    console.log("Quick action clicked:", actionId);
    // Handle different quick actions
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
    // Handle different reward assets
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
    // Handle referral actions
  };

  const handleActivityAction = (actionId) => {
    console.log("Activity action:", actionId);
    // Handle activity actions
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
        {/* Hero Section */}
        <ProfileHero 
          user={data.user} 
          xp={data.rewards.xp} 
        />

        {/* Profile Identity */}
        <ProfileIdentity
          user={data.user}
          level={data.rewards.xp.level}
          levelName={data.rewards.xp.levelName}
          memberSince={data.user.memberSince}
        />

        {/* Reward Assets */}
        <RewardAssets 
          rewards={data.rewards} 
          onAction={handleRewardAction}
        />

        {/* Two Column Layout - Level & Achievements */}
        <div className={styles.twoCol}>
          <LevelProgress xp={data.rewards.xp} />
          <div className={styles.achievementStack}>
            <CurrentAchievement 
              achievement={data.achievements.current} 
              onViewAll={handleViewAchievements} 
            />
            <NextAchievement 
              achievement={data.achievements.next} 
            />
          </div>
        </div>

        {/* Withdrawal Overview */}
        <WithdrawalOverview withdrawals={data.withdrawals} />

        {/* Quick Actions */}
        <QuickActions onAction={handleQuickAction} />

        {/* Two Column Layout - Referral & Activity */}
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

        {/* Account Information */}
        <AccountInformation user={data.user} />
      </div>
    </div>
  );
}