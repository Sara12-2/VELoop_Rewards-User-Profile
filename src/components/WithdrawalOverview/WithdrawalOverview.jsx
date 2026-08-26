import { ArrowDownToLine, Clock, CheckCircle2, Wallet, TrendingUp, AlertCircle, Gift, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./WithdrawalOverview.module.css";
import { useCountUp } from "../../hooks/useCountUp";

export default function WithdrawalOverview({ withdrawals }) {
  const animatedTotal = useCountUp(withdrawals.totalAmountWithdrawn || 0);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const hasHistory = withdrawals.totalRequests > 0;

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedStats(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Calculate percentages for visualization
  const total = withdrawals.totalRequests || 0;
  const approvedPercent = total > 0 ? (withdrawals.approved / total) * 100 : 0;
  const pendingPercent = total > 0 ? (withdrawals.pending / total) * 100 : 0;
  const otherPercent = total > 0 ? (withdrawals.other / total) * 100 : 0;

  if (!hasHistory) {
    return (
      <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <ArrowDownToLine size={18} />
            </div>
            <h3 className={styles.title}>Withdrawal Overview</h3>
          </div>
        </div>

        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrapper}>
            <Gift size={32} className={styles.emptyIcon} />
            <div className={styles.emptyIconGlow}></div>
          </div>
          <h4 className={styles.emptyTitle}>No Withdrawal History</h4>
          <p className={styles.emptyText}>
            Your withdrawal activity will appear here once you redeem your rewards.
          </p>
          <button className={styles.emptyCta}>
            <span>Explore Rewards</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.backgroundGlow}></div>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <ArrowDownToLine size={18} />
          </div>
          <h3 className={styles.title}>Withdrawal Overview</h3>
          <span className={styles.headerBadge}>
            <Sparkles size={10} />
            {withdrawals.totalRequests} Requests
          </span>
        </div>
        <button className={styles.viewAllBtn}>
          <span>View All</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Total Amount Card */}
      <div className={styles.totalCard}>
        <div className={styles.totalCardGlow}></div>
        <div className={styles.totalIconWrap}>
          <Wallet size={24} />
          <div className={styles.totalIconShine}></div>
        </div>
        <div className={styles.totalContent}>
          <span className={styles.totalAmount}>
            {withdrawals.currency || '₹'}{animatedTotal.toLocaleString()}
          </span>
          <span className={styles.totalLabel}>Total Withdrawn</span>
          <span className={styles.totalTrend}>
            <TrendingUp size={12} />
            +12.5% this month
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statGrid}>
        <div className={`${styles.statCard} ${styles.totalRequestsCard}`}>
          <div className={styles.statIconWrapper}>
            <Wallet size={16} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{withdrawals.totalRequests}</p>
            <p className={styles.statLabel}>Total Requests</p>
          </div>
          <div className={styles.statTrend}>
            <TrendingUp size={12} />
            <span>+3</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.approvedCard}`}>
          <div className={styles.statIconWrapper}>
            <CheckCircle2 size={16} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{withdrawals.approved}</p>
            <p className={styles.statLabel}>Approved</p>
          </div>
          <div className={styles.statStatus}>
            <span className={styles.statusDotGreen}></span>
            <span>{Math.round(approvedPercent)}%</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.pendingCard}`}>
          <div className={styles.statIconWrapper}>
            <Clock size={16} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{String(withdrawals.pending).padStart(2, '0')}</p>
            <p className={styles.statLabel}>Pending</p>
          </div>
          <div className={styles.statStatus}>
            <span className={styles.statusDotAmber}></span>
            <span>{Math.round(pendingPercent)}%</span>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.otherCard}`}>
          <div className={styles.statIconWrapper}>
            <AlertCircle size={16} />
          </div>
          <div className={styles.statContent}>
            <p className={styles.statValue}>{withdrawals.other || 0}</p>
            <p className={styles.statLabel}>Failed/Other</p>
          </div>
          <div className={styles.statStatus}>
            <span className={styles.statusDotRed}></span>
            <span>{Math.round(otherPercent)}%</span>
          </div>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className={styles.visualization}>
        <div className={styles.visualBar}>
          <div 
            className={`${styles.visualSegment} ${styles.approvedSegment}`}
            style={{ width: `${approvedPercent}%` }}
          >
            <span className={styles.segmentLabel}>{Math.round(approvedPercent)}%</span>
          </div>
          <div 
            className={`${styles.visualSegment} ${styles.pendingSegment}`}
            style={{ width: `${pendingPercent}%` }}
          >
            <span className={styles.segmentLabel}>{Math.round(pendingPercent)}%</span>
          </div>
          <div 
            className={`${styles.visualSegment} ${styles.otherSegment}`}
            style={{ width: `${otherPercent}%` }}
          >
            <span className={styles.segmentLabel}>{Math.round(otherPercent)}%</span>
          </div>
        </div>
        <div className={styles.visualLegend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDotGreen}></span>
            Approved
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDotAmber}></span>
            Pending
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDotRed}></span>
            Failed/Other
          </span>
        </div>
      </div>
    </section>
  );
}