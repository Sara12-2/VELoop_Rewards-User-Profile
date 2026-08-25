import { Trophy } from "lucide-react";
import styles from "./LevelProgress.module.css";
import { useCountUp } from "../../hooks/useCountUp";

export default function LevelProgress({ xp }) {
  const animatedXP = useCountUp(xp.current);
  const percent = Math.min(
    Math.round(((xp.current - xp.levelFloor) / (xp.nextLevelAt - xp.levelFloor)) * 100),
    100
  );

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <Trophy size={18} />
        </div>
        <div>
          <p className={styles.levelLabel}>LEVEL {String(xp.level).padStart(2, "0")}</p>
          <p className={styles.levelName}>{xp.levelName}</p>
        </div>
      </div>

      <div className={styles.progressBlock}>
        <div className={styles.progressLabelRow}>
          <span>{animatedXP.toLocaleString()} XP</span>
          <span className={styles.percent}>{percent}%</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
        <p className={styles.toNext}>
          {xp.xpToNextLevel.toLocaleString()} XP to Level {xp.level + 1}
        </p>
      </div>
    </section>
  );
}