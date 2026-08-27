import { Award, ChevronRight, Lock, Sparkles, Crown, Star, Trophy, TrendingUp, CheckCircle2, Zap, Gem } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./AchievementCard.module.css";

export function CurrentAchievement({ achievement, onViewAll }) {
  const [isHovered, setIsHovered] = useState(false);
  const [orbitItems, setOrbitItems] = useState([]);

  useEffect(() => {
    // Create orbiting items around the circle
    const items = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: [<Trophy size={12} />, <Star size={12} />, <Gem size={12} />, <Zap size={12} />, <Sparkles size={12} />, <Crown size={12} />][i % 6],
      angle: (i / 6) * 360,
      delay: i * 0.5,
      size: 20 + Math.random() * 10,
    }));
    setOrbitItems(items);
  }, []);

  return (
    <div 
      className={`${styles.card} ${styles.currentCard} ${isHovered ? styles.cardHover : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Center Circle */}
      <div className={styles.circleContainer}>
        <div className={styles.circleGlow}></div>
        <div className={styles.circleRing}>
          <div className={styles.circleRingInner}></div>
          <div className={styles.circleRingOuter}></div>
          
          {/* Orbiting Icons */}
          {orbitItems.map((item) => (
            <div
              key={item.id}
              className={styles.orbitIcon}
              style={{
                transform: `rotate(${item.angle}deg) translateX(${item.size}px)`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <div className={styles.orbitIconInner}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* Center Icon */}
        <div className={styles.circleCenter}>
          <div className={styles.circleCenterPulse}></div>
          <Trophy size={28} className={styles.circleIcon} />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
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

        <button className={styles.link} onClick={onViewAll}>
          <span>View Achievements</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {isHovered && <div className={styles.hoverGlow}></div>}
    </div>
  );
}

export function NextAchievement({ achievement }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const [orbitItems, setOrbitItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercent(achievement.progress || 0);
    }, 400);
    return () => clearTimeout(timer);
  }, [achievement.progress]);

  useEffect(() => {
    const items = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      icon: [<Lock size={12} />, <Star size={12} />, <Gem size={12} />, <Zap size={12} />, <Sparkles size={12} />, <Crown size={12} />][i % 6],
      angle: (i / 6) * 360,
      delay: i * 0.5,
      size: 20 + Math.random() * 10,
    }));
    setOrbitItems(items);
  }, []);

  return (
    <div 
      className={`${styles.card} ${styles.nextCard} ${isHovered ? styles.cardHover : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circle with Orbit */}
      <div className={styles.circleContainer}>
        <div className={styles.circleGlow} style={{ background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15), transparent 70%)' }}></div>
        <div className={styles.circleRing}>
          <div className={styles.circleRingInner}></div>
          <div className={styles.circleRingOuter}></div>
          
          {/* Orbiting Icons */}
          {orbitItems.map((item) => (
            <div
              key={item.id}
              className={styles.orbitIcon}
              style={{
                transform: `rotate(${item.angle}deg) translateX(${item.size}px)`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <div className={styles.orbitIconInner}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* Center Icon with Progress */}
        <div className={styles.circleCenter}>
          <div className={styles.circleCenterPulse} style={{ background: 'radial-gradient(circle, rgba(124, 77, 255, 0.2), transparent 70%)' }}></div>
          <Lock size={28} className={styles.circleIcon} style={{ color: '#B388FF' }} />
          <div className={styles.circleProgress}>
            <svg viewBox="0 0 60 60" className={styles.progressSvg}>
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="rgba(124, 77, 255, 0.08)"
                strokeWidth="3"
              />
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="163.36"
                strokeDashoffset={163.36 - (163.36 * animatedPercent) / 100}
                className={styles.progressCircle}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C4DFF" />
                  <stop offset="100%" stopColor="#B388FF" />
                </linearGradient>
              </defs>
            </svg>
            <span className={styles.progressText}>{achievement.progress}%</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
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
      </div>

      {isHovered && <div className={styles.hoverGlow}></div>}
    </div>
  );
}