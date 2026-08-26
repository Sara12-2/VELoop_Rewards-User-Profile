import { Coins, Info, TrendingUp, Zap, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import styles from "./VEsCard.module.css";

export default function VEsCard({ value, onAction }) {
  const animated = useCountUp(value || 0);
  const [showInfo, setShowInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 6,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      duration: 2.5 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.cardHover : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

      <div className={styles.cardGlow}></div>

      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <Coins size={22} className={styles.vesIcon} />
          <div className={styles.iconShine}></div>
        </div>
        <button
          className={styles.infoBtn}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="What are VEs?"
        >
          <Info size={14} />
          {showInfo && (
            <span className={styles.tooltip}>
              <span className={styles.tooltipIcon}>🪙</span>
              VEs are the primary virtual reward currency used within VELOOP Rewards.
              <span className={styles.tooltipArrow}></span>
            </span>
          )}
        </button>
      </div>

      <div className={styles.valueWrapper}>
        <span className={styles.value}>{animated.toLocaleString()}</span>
        <span className={styles.label}>VEs</span>
      </div>

      <div className={styles.statsRow}>
        <span className={styles.statsLabel}>
          <TrendingUp size={12} />
          +850 this week
        </span>
        <span className={styles.statsBadge}>
          <Award size={10} />
          Top Earner
        </span>
      </div>

      <button 
        className={styles.actionBtn}
        onClick={(e) => {
          e.stopPropagation();
          if (onAction) onAction();
        }}
      >
        <Coins size={14} />
        View Wallet
        <span className={styles.actionArrow}>→</span>
      </button>

      {isHovered && <div className={styles.hoverGlow}></div>}
    </div>
  );
}