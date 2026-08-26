import { useState, useEffect } from 'react';
import {
  Activity, Zap, Users, Gem, Send, Gift,
  TrendingUp, Clock, ChevronRight, Sparkles,
  Award, Coins, Star, Wallet, ArrowUpRight
} from 'lucide-react';
import styles from './RecentActivity.module.css';

const RecentActivity = ({ activities, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredActivity, setHoveredActivity] = useState(null);

  const defaultActivities = [
    {
      id: 1,
      icon: <Zap size={16} />,
      text: '+100 VEs Watch Ads Reward',
      amount: '+100 VEs',
      time: '2 min ago',
      type: 'earn',
      color: '#FFD700'
    },
    {
      id: 2,
      icon: <Users size={16} />,
      text: '+20 XP Referral Activity',
      amount: '+20 XP',
      time: '1 hour ago',
      type: 'earn',
      color: '#4CAF50'
    },
    {
      id: 3,
      icon: <Gem size={16} />,
      text: '+10 Gems Daily Bonus',
      amount: '+10 Gems',
      time: '3 hours ago',
      type: 'earn',
      color: '#00BCD4'
    },
    {
      id: 4,
      icon: <Send size={16} />,
      text: '-2,400 VEs UPI Redemption',
      amount: '-2,400 VEs',
      time: '5 hours ago',
      type: 'spend',
      color: '#E57373'
    },
    {
      id: 5,
      icon: <Gift size={16} />,
      text: '+50 VEs Welcome Bonus',
      amount: '+50 VEs',
      time: '1 day ago',
      type: 'earn',
      color: '#FF6B00'
    },
    {
      id: 6,
      icon: <Award size={16} />,
      text: 'Gold Reward Hunter Achievement',
      amount: 'Unlocked',
      time: '2 days ago',
      type: 'achievement',
      color: '#FFD700'
    }
  ];

  const activityData = activities || defaultActivities;
  const [displayActivities, setDisplayActivities] = useState(activityData.slice(0, 4));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getTypeIcon = (type) => {
    switch(type) {
      case 'earn': return <TrendingUp size={12} className={styles.typeIconEarn} />;
      case 'spend': return <ArrowUpRight size={12} className={styles.typeIconSpend} />;
      case 'achievement': return <Sparkles size={12} className={styles.typeIconAchievement} />;
      default: return null;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'earn': return 'Earned';
      case 'spend': return 'Spent';
      case 'achievement': return 'Unlocked';
      default: return '';
    }
  };

  return (
    <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.backgroundGlow}></div>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Activity size={18} />
          </div>
          <h3 className={styles.title}>Recent Activity</h3>
          <span className={styles.headerBadge}>
            <Clock size={10} />
            {activityData.length} Activities
          </span>
        </div>
        <button 
          className={styles.viewAllBtn}
          onClick={() => onAction?.('viewAll')}
        >
          <span>View All</span>
          <ChevronRight size={14} />
        </button>
      </div>

      <div className={styles.activityList}>
        {displayActivities.map((activity, index) => (
          <div
            key={activity.id}
            className={`${styles.activityItem} ${hoveredActivity === activity.id ? styles.activityItemHover : ''}`}
            onMouseEnter={() => setHoveredActivity(activity.id)}
            onMouseLeave={() => setHoveredActivity(null)}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className={styles.activityIconWrapper} style={{ background: `${activity.color}15`, color: activity.color }}>
              {activity.icon}
            </div>

            <div className={styles.activityContent}>
              <div className={styles.activityTextWrapper}>
                <span className={styles.activityText}>{activity.text}</span>
                <span className={styles.activityTime}>{activity.time}</span>
              </div>
              <div className={styles.activityMeta}>
                <span className={styles.activityAmount}>{activity.amount}</span>
                <span className={styles.activityType}>
                  {getTypeIcon(activity.type)}
                  {getTypeLabel(activity.type)}
                </span>
              </div>
            </div>

            {hoveredActivity === activity.id && (
              <div className={styles.activityShine}></div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={styles.activityStats}>
        <div className={styles.statItem}>
          <div className={styles.statIconWrapper}>
            <TrendingUp size={14} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Earned</span>
            <span className={styles.statValue}>+2,580 VEs</span>
          </div>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.statItem}>
          <div className={styles.statIconWrapper}>
            <Wallet size={14} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Spent</span>
            <span className={styles.statValue}>-2,400 VEs</span>
          </div>
        </div>
        <div className={styles.statDivider}></div>
        <div className={styles.statItem}>
          <div className={styles.statIconWrapper}>
            <Award size={14} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Achievements</span>
            <span className={styles.statValue}>3 Unlocked</span>
          </div>
        </div>
      </div>

      {/* View More */}
      <button 
        className={styles.viewMoreBtn}
        onClick={() => onAction?.('viewAll')}
      >
        <span>View All Activity</span>
        <ArrowUpRight size={16} />
      </button>
    </section>
  );
};

export default RecentActivity;