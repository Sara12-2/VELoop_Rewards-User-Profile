import { Trophy, Crown, Star, Sparkles, TrendingUp, Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./LevelProgress.module.css";
import { useCountUp } from "../../hooks/useCountUp";

export default function LevelProgress({ xp }) {
  const animatedXP = useCountUp(xp.current);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const percent = Math.min(
    Math.round(((xp.current - xp.levelFloor) / (xp.nextLevelAt - xp.levelFloor)) * 100),
    100
  );

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedPercent(percent);
    }, 400);
    return () => clearTimeout(timer);
  }, [percent]);

  const getLevelIcon = () => {
    if (xp.level >= 10) return <Crown size={20} />;
    if (xp.level >= 5) return <Star size={20} />;
    if (xp.level >= 3) return <Sparkles size={20} />;
    return <Trophy size={20} />;
  };

  const getProgressMessage = () => {
    if (percent >= 80) return 'Almost there! 🚀';
    if (percent >= 50) return 'Halfway there! 💪';
    if (percent >= 25) return 'Making progress! 🌟';
    return 'Keep going! ⚡';
  };

  const milestones = [
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' }
  ];

  return (
    <section className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}>
      <div className={styles.cardGlow}></div>
      
      <div className={styles.header}>
        <div className={styles.badge}>
          {getLevelIcon()}
          <div className={styles.badgeGlow}></div>
        </div>
        <div className={styles.headerContent}>
          <p className={styles.levelLabel}>
            <span className={styles.levelPrefix}>LEVEL</span>
            <span className={styles.levelNumber}>{String(xp.level).padStart(2, "0")}</span>
          </p>
          <p className={styles.levelName}>{xp.levelName}</p>
        </div>
        <div className={styles.levelBadge}>
          <Award size={14} />
          <span>Lv.{xp.level}</span>
        </div>
      </div>

      <div className={styles.progressBlock}>
        <div className={styles.progressLabelRow}>
          <div className={styles.xpLabelWrapper}>
            <TrendingUp size={14} className={styles.xpIcon} />
            <span className={styles.xpLabel}>Experience</span>
          </div>
          <div className={styles.xpValues}>
            <span className={styles.xpCurrent}>{animatedXP.toLocaleString()}</span>
            <span className={styles.xpDivider}>/</span>
            <span className={styles.xpMax}>{xp.nextLevelAt.toLocaleString()} XP</span>
          </div>
        </div>

        <div className={styles.trackWrapper}>
          <div className={styles.track}>
            <div 
              className={`${styles.fill} ${animatedPercent > 0 ? styles.fillAnimated : ''}`}
              style={{ width: `${animatedPercent}%` }}
            >
              <div className={styles.fillGlow}></div>
              <div className={styles.fillSparkle}></div>
            </div>
            <div 
              className={styles.fillTrail}
              style={{ width: `${animatedPercent}%` }}
            ></div>
          </div>
          <span className={styles.percent}>{percent}%</span>
        </div>

        {/* Milestones */}
        <div className={styles.milestones}>
          {milestones.map((milestone) => (
            <div 
              key={milestone.value}
              className={`${styles.milestone} ${animatedPercent >= milestone.value ? styles.milestoneActive : ''}`}
              style={{ left: `${milestone.value}%` }}
            >
              <span className={styles.milestoneDot}></span>
              <span className={styles.milestoneLabel}>{milestone.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.progressFooter}>
          <div className={styles.toNext}>
            <Zap size={14} className={styles.zapIcon} />
            <span>
              <strong>{xp.xpToNextLevel.toLocaleString()}</strong> XP to Level {xp.level + 1}
            </span>
          </div>
          <span className={styles.progressMessage}>
            {getProgressMessage()}
          </span>
        </div>
      </div>
    </section>
  );
}