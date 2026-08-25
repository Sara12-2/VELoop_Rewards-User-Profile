import ProfileHero from "../../components/ProfileHero/ProfileHero";
import RewardAssets from "../../components/RewardAssets/RewardAssets";
import LevelProgress from "../../components/LevelProgress/LevelProgress";
import { CurrentAchievement, NextAchievement } from "../../components/AchievementCard/AchievementCard";
import WithdrawalOverview from "../../components/WithdrawalOverview/WithdrawalOverview";
import QuickActions from "../../components/QuickActions/QuickActions";
import { userData } from "../../data/userData";
import { rewardsData, achievements } from "../../data/rewardsData";
import { withdrawalData } from "../../data/withdrawalData";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const handleViewAchievements = () => {
    alert("Achievements page coming soon!");
  };

  const handleQuickAction = (actionId) => {
    console.log("Quick action clicked:", actionId);
    alert(`"${actionId}" feature coming soon!`);
  };

  return (
    <div className={styles.page}>
      <ProfileHero user={userData} xp={rewardsData.xp} />
      <RewardAssets rewards={rewardsData} />

      <div className={styles.twoCol}>
        <LevelProgress xp={rewardsData.xp} />
        <div className={styles.achievementStack}>
          <CurrentAchievement achievement={achievements.current} onViewAll={handleViewAchievements} />
          <NextAchievement achievement={achievements.next} />
        </div>
      </div>

      <WithdrawalOverview withdrawals={withdrawalData} />
      <QuickActions onAction={handleQuickAction} />
      {/* Next: ReferralSnapshot */}
    </div>
  );
}