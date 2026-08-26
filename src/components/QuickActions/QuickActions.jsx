import { useState } from 'react';
import {
  Zap, Gem, Gift, Tv, Share2, Send, Award,
  Sparkles, ChevronRight, TrendingUp, Rocket
} from 'lucide-react';
import styles from './QuickActions.module.css';

const QuickActions = ({ onAction }) => {  // ← Make sure onAction is accepted
  const [hoveredAction, setHoveredAction] = useState(null);

  const actions = [
    {
      id: 'gems',
      icon: <Gem size={20} />,
      label: 'Get More Gems',
      description: 'Earn gems through activities',
      gradient: 'linear-gradient(135deg, #00BCD4, #0097A7)',
      bgColor: 'rgba(0, 188, 212, 0.08)',
      borderColor: 'rgba(0, 188, 212, 0.15)'
    },
    {
      id: 'rewards',
      icon: <Gift size={20} />,
      label: 'Earn More Rewards',
      description: 'Explore earning opportunities',
      gradient: 'linear-gradient(135deg, #FFD700, #FFA500)',
      bgColor: 'rgba(255, 215, 0, 0.08)',
      borderColor: 'rgba(255, 215, 0, 0.15)'
    },
    {
      id: 'ads',
      icon: <Tv size={20} />,
      label: 'Watch Ads',
      description: 'Watch & earn rewards',
      gradient: 'linear-gradient(135deg, #7C4DFF, #B388FF)',
      bgColor: 'rgba(124, 77, 255, 0.08)',
      borderColor: 'rgba(124, 77, 255, 0.15)'
    },
    {
      id: 'refer',
      icon: <Share2 size={20} />,
      label: 'Refer Friends',
      description: 'Invite and earn bonuses',
      gradient: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
      bgColor: 'rgba(76, 175, 80, 0.08)',
      borderColor: 'rgba(76, 175, 80, 0.15)'
    },
    {
      id: 'redeem',
      icon: <Send size={20} />,
      label: 'Redeem Rewards',
      description: 'Cash out your earnings',
      gradient: 'linear-gradient(135deg, #FF6B00, #FF1493)',
      bgColor: 'rgba(255, 107, 0, 0.08)',
      borderColor: 'rgba(255, 107, 0, 0.15)'
    },
    {
      id: 'achievements',
      icon: <Award size={20} />,
      label: 'Achievements',
      description: 'View your progress',
      gradient: 'linear-gradient(135deg, #FFD700, #FF6B00)',
      bgColor: 'rgba(255, 215, 0, 0.08)',
      borderColor: 'rgba(255, 215, 0, 0.15)'
    }
  ];

  const handleActionClick = (actionId) => {
    if (onAction) {
      onAction(actionId);
    } else {
      console.log(`Action clicked: ${actionId}`);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Zap size={18} />
          </div>
          <h3 className={styles.title}>Quick Actions</h3>
        </div>
        <span className={styles.headerBadge}>
          <Rocket size={12} />
          6 Actions
        </span>
      </div>

      <div className={styles.actionsGrid}>
        {actions.map((action) => (
          <div
            key={action.id}
            className={`${styles.actionCard} ${hoveredAction === action.id ? styles.actionCardHover : ''}`}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            onClick={() => handleActionClick(action.id)}
            style={{
              '--action-gradient': action.gradient,
              '--action-bg': action.bgColor,
              '--action-border': action.borderColor
            }}
          >
            <div className={styles.actionGlow} style={{ background: action.gradient }}></div>
            
            <div className={styles.actionContent}>
              <div className={styles.actionIconWrapper} style={{ background: action.bgColor }}>
                {action.icon}
              </div>
              
              <div className={styles.actionInfo}>
                <h4 className={styles.actionLabel}>{action.label}</h4>
                <p className={styles.actionDescription}>{action.description}</p>
              </div>
              
              <div className={styles.actionArrow}>
                <ChevronRight size={18} />
              </div>
            </div>

            {hoveredAction === action.id && (
              <div className={styles.actionShine}></div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={styles.quickStats}>
        <div className={styles.quickStat}>
          <span className={styles.quickStatLabel}>Today's Earnings</span>
          <span className={styles.quickStatValue}>
            <Sparkles size={12} />
            +450 VEs
          </span>
        </div>
        <div className={styles.quickStatDivider}></div>
        <div className={styles.quickStat}>
          <span className={styles.quickStatLabel}>Referral Bonus</span>
          <span className={styles.quickStatValue}>
            <TrendingUp size={12} />
            +5% Boost
          </span>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;