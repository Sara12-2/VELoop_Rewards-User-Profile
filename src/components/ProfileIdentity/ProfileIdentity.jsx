import { Hash, Mail, Gift, Star, Copy, Check, User, Calendar, Shield, Sparkles } from "lucide-react";
import styles from "./ProfileIdentity.module.css";
import { useState, useEffect } from "react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export default function ProfileIdentity({ user, level, levelName, memberSince }) {
  const { copy } = useCopyToClipboard();
  const [copiedField, setCopiedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopy = (field, value) => {
    copy(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fields = [
    {
      key: "userId",
      label: "User ID",
      value: user.userId,
      icon: Hash,
      copyable: true,
      gradient: "linear-gradient(135deg, #FFD700, #FFA500)",
      tooltip: "Your unique VELOOP identity number"
    },
    {
      key: "email",
      label: "Email Address",
      value: user.email,
      icon: Mail,
      copyable: false,
      gradient: "linear-gradient(135deg, #00D4FF, #0099FF)",
      tooltip: "Your registered email address"
    },
    {
      key: "referralCode",
      label: "Referral Code",
      value: user.referralCode,
      icon: Gift,
      copyable: true,
      gradient: "linear-gradient(135deg, #7C4DFF, #B388FF)",
      tooltip: "Share this code to earn rewards"
    },
    {
      key: "level",
      label: "Current Level",
      value: `Level ${String(level).padStart(2, "0")}`,
      subtitle: levelName,
      icon: Star,
      copyable: false,
      gradient: "linear-gradient(135deg, #FF6B00, #FF1493)",
      tooltip: "Your current progression level"
    },
    {
      key: "memberSince",
      label: "Member Since",
      value: memberSince || "January 2024",
      icon: Calendar,
      copyable: false,
      gradient: "linear-gradient(135deg, #4CAF50, #8BC34A)",
      tooltip: "When you joined VELOOP Rewards"
    },
    {
      key: "accountStatus",
      label: "Account Status",
      value: "Active",
      icon: Shield,
      copyable: false,
      gradient: "linear-gradient(135deg, #4CAF50, #2E7D32)",
      tooltip: "Your account is fully active",
      status: true
    },
  ];

  return (
    <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <User size={20} />
          </div>
          <h2 className={styles.title}>Profile Identity</h2>
        </div>
        <span className={styles.headerBadge}>
          <Sparkles size={12} />
          Verified
        </span>
      </div>

      <div className={styles.grid}>
        {fields.map(({ key, label, value, subtitle, icon: Icon, copyable, gradient, tooltip, status }) => (
          <div 
            key={key} 
            className={`${styles.card} ${hoveredCard === key ? styles.cardHover : ''}`}
            onMouseEnter={() => setHoveredCard(key)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ '--card-gradient': gradient }}
          >
            {/* Card glow effect */}
            <div className={styles.cardGlow} style={{ background: gradient }}></div>
            
            <div className={styles.cardContent}>
              <div className={styles.iconWrap} style={{ background: gradient }}>
                <Icon size={18} />
              </div>
              
              <div className={styles.textBlock}>
                <p className={styles.label}>
                  {label}
                  {tooltip && (
                    <span className={styles.tooltipTrigger} data-tooltip={tooltip}>
                      <span className={styles.infoIcon}>i</span>
                    </span>
                  )}
                </p>
                <p className={styles.value}>
                  {value}
                  {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                </p>
                {status && (
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot}></span>
                    Active
                  </span>
                )}
              </div>

              {copyable && (
                <div className={styles.copyWrap}>
                  <button
                    className={`${styles.copyBtn} ${copiedField === key ? styles.copyBtnSuccess : ''}`}
                    onClick={() => handleCopy(key, value)}
                    aria-label={`Copy ${label}`}
                  >
                    {copiedField === key ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  {copiedField === key && (
                    <span className={styles.toast}>
                      <Check size={12} />
                      Copied!
                    </span>
                  )}
                  <div className={styles.copyRipple}></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}