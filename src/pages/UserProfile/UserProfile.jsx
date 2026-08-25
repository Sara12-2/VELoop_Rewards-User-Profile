import ProfileHero from "../../components/ProfileHero/ProfileHero";
import { userData } from "../../data/userData";
import { rewardsData } from "../../data/rewardsData";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  return (
    <div className={styles.page}>
      <ProfileHero user={userData} xp={rewardsData.xp} />
      {/* Next: ProfileIdentity, RewardAssets, LevelProgress, etc. */}
    </div>
  );
}