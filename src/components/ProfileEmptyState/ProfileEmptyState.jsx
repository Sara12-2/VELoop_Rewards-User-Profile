import { AlertTriangle, RefreshCw, Sparkles, Gift, Users, Wallet, Award } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./ProfileEmptyState.module.css";

export default function ProfileEmptyState({
  icon: Icon = AlertTriangle,
  title = "Unable to Load Profile",
  message = "We couldn't load your profile information right now.",
  ctaLabel = "Try Again",
  onCta,
  variant = "error", // error, empty, loading
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    const newParticles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: 4 + Math.random() * 8,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  const getVariantStyles = () => {
    switch(variant) {
      case 'empty':
        return {
          iconColor: '#FFD700',
          borderColor: 'rgba(255, 215, 0, 0.12)',
          glowColor: 'rgba(255, 215, 0, 0.05)',
          gradient: 'linear-gradient(145deg, rgba(255, 215, 0, 0.03), rgba(255, 107, 0, 0.01))'
        };
      case 'loading':
        return {
          iconColor: '#00BCD4',
          borderColor: 'rgba(0, 188, 212, 0.12)',
          glowColor: 'rgba(0, 188, 212, 0.05)',
          gradient: 'linear-gradient(145deg, rgba(0, 188, 212, 0.03), rgba(0, 151, 167, 0.01))'
        };
      default:
        return {
          iconColor: '#E57373',
          borderColor: 'rgba(229, 115, 115, 0.12)',
          glowColor: 'rgba(229, 115, 115, 0.05)',
          gradient: 'linear-gradient(145deg, rgba(229, 115, 115, 0.03), rgba(239, 83, 80, 0.01))'
        };
    }
  };

  const styles_variant = getVariantStyles();

  const getIcon = () => {
    if (variant === 'empty') return <Gift size={36} />;
    if (variant === 'loading') return <RefreshCw size={36} />;
    return <Icon size={36} />;
  };

  return (
    <div 
      className={`${styles.wrap} ${isVisible ? styles.wrapVisible : ''}`}
      style={{
        '--border-color': styles_variant.borderColor,
        '--glow-color': styles_variant.glowColor,
        '--gradient-bg': styles_variant.gradient
      }}
    >
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
              background: styles_variant.iconColor,
              boxShadow: `0 0 ${p.size * 2}px ${styles_variant.iconColor}30`
            }}
          />
        ))}
      </div>

      {/* Background Glow */}
      <div className={styles.glowRing}></div>

      <div className={styles.iconWrapper} style={{ color: styles_variant.iconColor }}>
        {getIcon()}
        <div className={styles.iconPulse}></div>
        <div className={styles.iconShine}></div>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>

      {onCta && (
        <button className={styles.cta} onClick={onCta}>
          <RefreshCw size={16} className={styles.ctaIcon} />
          {ctaLabel}
        </button>
      )}

      {/* Decorative elements */}
      <div className={styles.decorativeLine}></div>
      <div className={styles.decorativeDot1}></div>
      <div className={styles.decorativeDot2}></div>
    </div>
  );
}