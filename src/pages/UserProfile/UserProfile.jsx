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

  if (status === "loading") {
    return <ProfileSkeleton />;
  }

  if (status === "error") {
    return (
      <div className={styles.page}>
        <ProfileEmptyState
          title="Unable to Load Profile"
          message="We couldn't load your profile information right now."
          ctaLabel="Try Again"
          onCta={handleRetry}
        />
      </div>
    );
  }

  const handleViewAchievements = () => {
    alert("Achievements page coming soon!");
  };

  const handleQuickAction = (actionId) => {
    console.log("Quick action clicked:", actionId);
    alert(`"${actionId}" feature coming soon!`);
  };

  return (
    <div className={styles.page}>
      <ProfileHero user={data.user} xp={data.rewards.xp} />
      <ProfileIdentity
        user={data.user}
        level={data.rewards.xp.level}
        levelName={data.rewards.xp.levelName}
      />
      <RewardAssets rewards={data.rewards} />

      <div className={styles.twoCol}>
        <LevelProgress xp={data.rewards.xp} />
        <div className={styles.achievementStack}>
          <CurrentAchievement achievement={data.achievements.current} onViewAll={handleViewAchievements} />
          <NextAchievement achievement={data.achievements.next} />
        </div>
      </div>

      <WithdrawalOverview withdrawals={data.withdrawals} />
      <QuickActions onAction={handleQuickAction} />

      <div className={styles.twoCol}>
        <ReferralSnapshot referral={data.referral} />
        <RecentActivity activity={data.activity} />
      </div>

      <AccountInformation user={data.user} />
    </div>
  );
}