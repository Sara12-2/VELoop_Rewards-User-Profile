import styles from "./ProfileSkeleton.module.css";

function Block({ className }) {
  return <div className={`${styles.shimmer} ${className || ""}`} />;
}

export default function ProfileSkeleton() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Loading profile">
      {/* Hero skeleton */}
      <div className={styles.card}>
        <div className={styles.heroRow}>
          <Block className={styles.avatar} />
          <div className={styles.heroText}>
            <Block className={styles.line60} />
            <Block className={styles.line40} />
            <Block className={styles.barFull} />
          </div>
        </div>
      </div>

      {/* Reward assets skeleton */}
      <div className={styles.grid5}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.smallCard}>
            <Block className={styles.iconCircle} />
            <Block className={styles.line60} />
            <Block className={styles.line40} />
          </div>
        ))}
      </div>

      {/* Level + achievement skeleton */}
      <div className={styles.twoCol}>
        <div className={styles.card}>
          <Block className={styles.line40} />
          <Block className={styles.barFull} />
        </div>
        <div className={styles.card}>
          <Block className={styles.line60} />
          <Block className={styles.line40} />
        </div>
      </div>

      {/* Withdrawal skeleton */}
      <div className={styles.grid4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.smallCard}>
            <Block className={styles.line60} />
            <Block className={styles.line40} />
          </div>
        ))}
      </div>
    </div>
  );
}