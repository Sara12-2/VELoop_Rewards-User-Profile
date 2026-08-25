import { ArrowUpRight, ArrowDownRight, History } from "lucide-react";
import styles from "./RecentActivity.module.css";

export default function RecentActivity({ activity }) {
  const hasActivity = activity && activity.length > 0;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Recent Activity</h2>

      {!hasActivity ? (
        <div className={styles.emptyState}>
          <History size={28} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No Recent Activity</p>
          <p className={styles.emptyText}>
            Your reward activity will show up here as you engage with VELOOP Rewards.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {activity.map((item) => (
            <div key={item.id} className={styles.row}>
              <div className={styles.iconWrap} data-type={item.type}>
                {item.type === "credit" ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
              </div>
              <div className={styles.textBlock}>
                <p className={styles.label}>{item.label}</p>
                <p className={styles.timestamp}>{item.timestamp}</p>
              </div>
              <span className={styles.amount} data-type={item.type}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}