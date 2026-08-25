import { ArrowDownToLine, Clock, CheckCircle2, Wallet } from "lucide-react";
import styles from "./WithdrawalOverview.module.css";
import { useCountUp } from "../../hooks/useCountUp";

export default function WithdrawalOverview({ withdrawals }) {
  const animatedTotal = useCountUp(withdrawals.totalAmountWithdrawn);
  const hasHistory = withdrawals.totalRequests > 0;

  if (!hasHistory) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Withdrawal Overview</h2>
        <div className={styles.emptyState}>
          <ArrowDownToLine size={28} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No Withdrawal History</p>
          <p className={styles.emptyText}>
            Your withdrawal activity will appear here once you redeem your rewards.
          </p>
          <button className={styles.emptyCta}>Explore Rewards →</button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Withdrawal Overview</h2>

      <div className={styles.totalCard}>
        <div className={styles.totalIconWrap}>
          <Wallet size={22} />
        </div>
        <div>
          <p className={styles.totalAmount}>
            {withdrawals.currency}{animatedTotal.toLocaleString()}
          </p>
          <p className={styles.totalLabel}>Total Withdrawn</p>
        </div>
      </div>

      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <p className={styles.statValue}>{withdrawals.totalRequests}</p>
          <p className={styles.statLabel}>Total Requests</p>
        </div>

        <div className={styles.statCard} data-status="approved">
          <div className={styles.statHeader}>
            <CheckCircle2 size={14} />
            <span>Approved</span>
          </div>
          <p className={styles.statValue}>{withdrawals.approved}</p>
        </div>

        <div className={styles.statCard} data-status="pending">
          <div className={styles.statHeader}>
            <Clock size={14} />
            <span>Pending</span>
          </div>
          <p className={styles.statValue}>{String(withdrawals.pending).padStart(2, "0")}</p>
        </div>

        <div className={styles.statCard} data-status="other">
          <div className={styles.statHeader}>
            <span>Other</span>
          </div>
          <p className={styles.statValue}>{withdrawals.other}</p>
        </div>
      </div>
    </section>
  );
}