import { CheckCircle2 } from "lucide-react";
import styles from "./ProfileHero.module.css";
import { useCountUp } from "../../hooks/useCountUp";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfileHero({ user, xp }) {
  const animatedXP = useCountUp(xp.current);
  const percent = Math.min(
    Math.round(((xp.current - xp.levelFloor) / (xp.nextLevelAt - xp.levelFloor)) * 100),
    100
  );

  return (
    <section className={styles.hero}>
      <div className={styles.avatarWrap}>
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className={styles.avatarImg} />
        ) : (
          <div className={styles.avatarFallback}>{getInitials(user.name)}</div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h1 className={styles.name}>{user.name}</h1>
          {user.accountStatus === "active" && (
            <span className={styles.statusPill}>
              <CheckCircle2 size={14} />
              Account Active
            </span>
          )}
        </div>

        <div className={styles.levelBadge}>
          Level {String(xp.level).padStart(2, "0")} — {xp.levelName}
        </div>

        <div className={styles.xpBlock}>
          <div className={styles.xpLabelRow}>
            <span>{animatedXP.toLocaleString()} / {xp.nextLevelAt.toLocaleString()} XP</span>
            <span className={styles.xpPercent}>{percent}%</span>
          </div>
          <div className={styles.xpTrack}>
            <div className={styles.xpFill} style={{ width: `${percent}%` }} />
          </div>
          <p className={styles.xpToNext}>
            {xp.xpToNextLevel.toLocaleString()} XP to Level {xp.level + 1}
          </p>
        </div>
      </div>
    </section>
  );
}