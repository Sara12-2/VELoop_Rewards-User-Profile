import { useState, useEffect, useRef } from 'react';
import {
  Activity, Zap, Users, Gem, Send, Gift,
  TrendingUp, Clock, ChevronRight, Sparkles,
  Award, Coins, Star, Wallet, ArrowUpRight,
  ChevronLeft, ChevronRight as ChevronRightIcon
} from 'lucide-react';
import styles from './RecentActivity.module.css';

const RecentActivity = ({ activities, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredActivity, setHoveredActivity] = useState(null);
  const intervalRef = useRef(null);

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
  const itemsPerView = 3;
  const totalSlides = Math.ceil(activityData.length / itemsPerView);

  const getVisibleItems = () => {
    const start = currentIndex * itemsPerView;
    return activityData.slice(start, start + itemsPerView);
  };

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

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoPlaying) {
      intervalRef.current = setInterval(goToNext, 4000);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    if (isAutoPlaying && totalSlides > 1) {
      intervalRef.current = setInterval(goToNext, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides]);

  useEffect(() => {
    resetAutoPlay();
  }, [currentIndex]);

  const visibleItems = getVisibleItems();

  return (
    <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.backgroundGlow}></div>

      {/* Header */}
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

      {/* Orbit Carousel */}
      <div className={styles.orbitContainer}>
        <div className={styles.orbitTrack}>
          {visibleItems.map((activity, index) => (
            <div
              key={activity.id}
              className={`${styles.orbitItem} ${hoveredActivity === activity.id ? styles.orbitItemHover : ''}`}
              onMouseEnter={() => setHoveredActivity(activity.id)}
              onMouseLeave={() => setHoveredActivity(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
                '--orbit-color': activity.color
              }}
            >
              <div className={styles.orbitGlow} style={{ background: activity.color }}></div>
              
              <div className={styles.orbitIconWrapper} style={{ background: `${activity.color}15`, color: activity.color }}>
                {activity.icon}
              </div>

              <div className={styles.orbitContent}>
                <div className={styles.orbitTextWrapper}>
                  <span className={styles.orbitText}>{activity.text}</span>
                  <span className={styles.orbitTime}>{activity.time}</span>
                </div>
                <div className={styles.orbitMeta}>
                  <span className={styles.orbitAmount}>{activity.amount}</span>
                  <span className={styles.orbitType}>
                    {getTypeIcon(activity.type)}
                    {getTypeLabel(activity.type)}
                  </span>
                </div>
              </div>

              {hoveredActivity === activity.id && (
                <div className={styles.orbitShine}></div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className={styles.orbitControls}>
            <button 
              className={styles.orbitNavBtn}
              onClick={goToPrev}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div className={styles.orbitDots}>
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.orbitDot} ${idx === currentIndex ? styles.orbitDotActive : ''}`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              className={styles.orbitNavBtn}
              onClick={goToNext}
              aria-label="Next"
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>
        )}
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
        <div className={styles.statItem}>
          <div className={styles.statIconWrapper}>
            <Wallet size={14} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Spent</span>
            <span className={styles.statValue}>-2,400 VEs</span>
          </div>
        </div>
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