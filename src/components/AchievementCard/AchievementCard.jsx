import { Award, ChevronRight, Lock, Sparkles, Crown, Star, Trophy, TrendingUp, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./AchievementCard.module.css";

export function CurrentAchievement({ achievement, onViewAll }) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 5,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className={`${styles.card} ${styles.currentCard} ${isHovered ? styles.cardHover : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className={styles.cardGlow}></div>
      
      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={styles.particle}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.row}>
        <div className={`${styles.iconWrap} ${styles.unlockedIcon}`}>
          <div className={styles.iconPulse}></div>
          <Trophy size={22} className={styles.trophyIcon} />
          <div className={styles.iconShine}></div>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>
            <Sparkles size={12} className={styles.eyebrowIcon} />
            Current Achievement
          </p>
          <p className={styles.name}>{achievement.name}</p>
          <span className={styles.statusUnlocked}>
            <CheckCircle2 size={14} />
            Unlocked
            <span className={styles.statusDot}></span>
          </span>
        </div>
      </div>

      <button className={styles.link} onClick={onViewAll}>
        <span>View Achievements</span>
        <ChevronRight size={16} />
      </button>

      {isHovered && <div className={styles.hoverGlow}></div>}
    </div>
  );
}

export function NextAchievement({ achievement }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(achievement.progress || 0);
    }, 400);
    return () => clearTimeout(timer);
  }, [achievement.progress]);

  return (
    <div 
      className={`${styles.card} ${styles.nextCard} ${isHovered ? styles.cardHover : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardGlow} style={{ background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.05), rgba(179, 136, 255, 0.02))' }}></div>

      <div className={styles.row}>
        <div className={`${styles.iconWrap} ${styles.lockedIcon}`}>
          <Lock size={20} />
          <div className={styles.lockGlow}></div>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>
            <Star size={12} className={styles.eyebrowIcon} />
            Next Achievement
          </p>
          <p className={styles.name}>{achievement.name}</p>
          <p className={styles.hint}>
            <TrendingUp size={12} />
            Earn {achievement.xpNeeded.toLocaleString()} more XP to unlock
          </p>
        </div>
        <div className={styles.progressBadge}>
          {achievement.progress}%
        </div>
      </div>

      <div className={styles.track}>
        <div 
          className={`${styles.fill} ${animatedPercent > 0 ? styles.fillAnimated : ''}`}
          style={{ width: `${animatedPercent}%` }}
        >
          <div className={styles.fillGlow}></div>
        </div>
        <div 
          className={styles.fillTrail}
          style={{ width: `${animatedPercent}%` }}
        ></div>
      </div>

      <div className={styles.milestoneMarkers}>
        <div className={styles.marker} style={{ left: '25%' }}>
          <span className={styles.markerDot}></span>
        </div>
        <div className={styles.marker} style={{ left: '50%' }}>
          <span className={styles.markerDot}></span>
        </div>
        <div className={styles.marker} style={{ left: '75%' }}>
          <span className={styles.markerDot}></span>
        </div>
        <div className={`${styles.marker} ${styles.markerFinal}`} style={{ left: '100%' }}>
          <span className={styles.markerDot}>
            <Crown size={8} />
          </span>
        </div>
      </div>

      {isHovered && <div className={styles.hoverGlow}></div>}
    </div>
  );
}