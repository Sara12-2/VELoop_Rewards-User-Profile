import { 
  CheckCircle2, Sparkles, Crown, Trophy, TrendingUp, Zap, 
  Star, Flame, Target, Award, Gift, Rocket, 
  Circle, BadgeCheck, Gem, Medal
} from "lucide-react";
import styles from "./ProfileHero.module.css";
import { useCountUp } from "../../hooks/useCountUp";
import { useState, useEffect, useRef } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [barWidth, setBarWidth] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const xpTrackRef = useRef(null);

  const percent = Math.min(
    Math.round(((xp.current - xp.levelFloor) / (xp.nextLevelAt - xp.levelFloor)) * 100),
    100
  );

  useEffect(() => {
    setIsVisible(true);
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 12 + 6,
      delay: Math.random() * 6,
      color: ['#FFD700', '#FF6B00', '#FF1493', '#00D4FF', '#7C4DFF', '#4CAF50'][Math.floor(Math.random() * 6)]
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setBarWidth(percent);
    }, 400);

    if (percent >= 80) {
      setTimeout(() => setShowSparkles(true), 800);
    }

    return () => clearTimeout(timer);
  }, [percent]);

  const sparkleParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    size: 4 + Math.random() * 6,
    duration: 1 + Math.random() * 2,
  }));

  const getProgressMessage = () => {
    if (percent >= 80) return 'Almost there!';
    if (percent >= 50) return 'Halfway there!';
    return 'Keep going!';
  };

  const getProgressIcon = () => {
    if (percent >= 80) return <Rocket size={12} />;
    if (percent >= 50) return <Target size={12} />;
    return <Gift size={12} />;
  };

  return (
    <section className={`${styles.hero} ${isVisible ? styles.heroVisible : ''}`}>
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
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}40`
            }}
          />
        ))}
      </div>

      {/* Glow Effect */}
      <div className={styles.heroGlow}></div>

      <div className={styles.avatarWrap}>
        <div className={styles.avatarPulse}></div>
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.name} className={styles.avatarImg} />
        ) : (
          <div className={styles.avatarFallback}>
            {getInitials(user.name)}
            <div className={styles.avatarShine}></div>
          </div>
        )}
        <div className={styles.levelRing}>
          <svg viewBox="0 0 120 120" className={styles.ringSvg}>
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255, 215, 0, 0.1)"
              strokeWidth="4"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="url(#levelGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="339.292"
              strokeDashoffset={339.292 - (339.292 * percent) / 100}
              className={styles.ringProgress}
            />
            <defs>
              <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.levelBadgeRing}>
            <span className={styles.levelNumber}>
              {String(xp.level).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>
              {user.name}
              <Sparkles size={16} className={styles.sparkleIcon} />
            </h1>
            <div className={styles.userTitle}>
              <Trophy size={14} className={styles.trophyIcon} />
              <span>{xp.levelName}</span>
            </div>
          </div>
          {user.accountStatus === "active" && (
            <span className={styles.statusPill}>
              <BadgeCheck size={14} />
              Account Active
              <span className={styles.statusDot}></span>
            </span>
          )}
        </div>

        <div className={styles.levelBadge}>
          <Crown size={16} className={styles.crownIcon} />
          <span>Level {String(xp.level).padStart(2, "0")}</span>
          <div className={styles.levelBadgeGlow}></div>
        </div>

        <div className={styles.xpBlock}>
          <div className={styles.xpLabelRow}>
            <div className={styles.xpLabelWrapper}>
              <Flame size={14} className={styles.xpIcon} />
              <span>Experience Points</span>
            </div>
            <span className={styles.xpValues}>
              <span className={styles.xpCurrent}>{animatedXP.toLocaleString()}</span>
              <span className={styles.xpDivider}>/</span>
              <span className={styles.xpMax}>{xp.nextLevelAt.toLocaleString()} XP</span>
            </span>
          </div>

          <div className={styles.xpTrackWrapper} ref={xpTrackRef}>
            <div className={styles.xpTrack}>
              <div 
                className={`${styles.xpFill} ${barWidth > 0 ? styles.xpFillAnimated : ''}`} 
                style={{ width: `${barWidth}%` }}
              >
                <div className={styles.xpFillGlow}></div>
                {showSparkles && (
                  <div className={styles.barSparkles}>
                    {sparkleParticles.map((sp) => (
                      <div
                        key={sp.id}
                        className={styles.barSparkle}
                        style={{
                          left: `${sp.x}%`,
                          width: sp.size,
                          height: sp.size,
                          animationDelay: `${sp.delay}s`,
                          animationDuration: `${sp.duration}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className={styles.barRipple}></div>
              </div>
              <div 
                className={styles.xpGlowTrail} 
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <span className={styles.xpPercent}>{percent}%</span>
          </div>

          {/* Milestone indicators */}
          <div className={styles.milestones}>
            <div className={styles.milestone} style={{ left: '25%' }}>
              <span className={styles.milestoneDot}></span>
              <span className={styles.milestoneLabel}>25%</span>
            </div>
            <div className={styles.milestone} style={{ left: '50%' }}>
              <span className={styles.milestoneDot}></span>
              <span className={styles.milestoneLabel}>50%</span>
            </div>
            <div className={styles.milestone} style={{ left: '75%' }}>
              <span className={styles.milestoneDot}></span>
              <span className={styles.milestoneLabel}>75%</span>
            </div>
            <div className={`${styles.milestone} ${styles.milestoneFinal}`} style={{ left: '100%' }}>
              <span className={styles.milestoneDot}></span>
              <span className={styles.milestoneLabel}>
                <Medal size={10} />
              </span>
            </div>
          </div>

          <p className={styles.xpToNext}>
            <Zap size={12} className={styles.zapIcon} />
            {xp.xpToNextLevel.toLocaleString()} XP to Level {xp.level + 1}
            <span className={styles.xpProgressText}>
              {getProgressIcon()}
              {getProgressMessage()}
            </span>
            <span className={styles.progressDots}>
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`${styles.progressDot} ${i < Math.floor(percent / 20) ? styles.progressDotActive : ''}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
          </p>

          {/* Confetti when near completion */}
          {percent >= 80 && (
            <div className={styles.confettiContainer}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={styles.confetti}
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random() * 2}s`,
                    background: ['#FFD700', '#FF6B00', '#FF1493', '#00D4FF', '#7C4DFF', '#4CAF50'][i % 6]
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}