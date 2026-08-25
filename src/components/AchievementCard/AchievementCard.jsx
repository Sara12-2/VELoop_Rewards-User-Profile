import { Award, ChevronRight, Lock } from "lucide-react";
import styles from "./AchievementCard.module.css";

export function CurrentAchievement({ achievement, onViewAll }) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.iconWrap} data-variant="unlocked">
          <Award size={20} />
        </div>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Current Achievement</p>
          <p className={styles.name}>{achievement.name}</p>
          <span className={styles.statusUnlocked}>Unlocked ✓</span>
        </div>
      </div>
      <button className={styles.link} onClick={onViewAll}>
        View Achievements <ChevronRight size={14} />
      </button>
    </div>
  );
}

export function NextAchievement({ achievement }) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.iconWrap} data-variant="locked">
          <Lock size={18} />
        </div>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Next Achievement</p>
          <p className={styles.name}>{achievement.name}</p>
          <p className={styles.hint}>
            Earn {achievement.xpNeeded.toLocaleString()} more XP to unlock.
          </p>
        </div>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${achievement.progress}%` }} />
      </div>
    </div>
  );
}