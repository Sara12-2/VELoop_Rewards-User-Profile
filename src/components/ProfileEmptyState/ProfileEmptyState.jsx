import { AlertTriangle } from "lucide-react";
import styles from "./ProfileEmptyState.module.css";

export default function ProfileEmptyState({
  icon: Icon = AlertTriangle,
  title = "Unable to Load Profile",
  message = "We couldn't load your profile information right now.",
  ctaLabel = "Try Again",
  onCta,
}) {
  return (
    <div className={styles.wrap}>
      <Icon size={32} className={styles.icon} />
      <p className={styles.title}>{title}</p>
      <p className={styles.message}>{message}</p>
      {onCta && (
        <button className={styles.cta} onClick={onCta}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}