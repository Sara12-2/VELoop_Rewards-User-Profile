import { Gem, Sparkles, PlayCircle, Users, Wallet, Award, ChevronRight } from "lucide-react";
import styles from "./QuickActions.module.css";

const actions = [
  {
    id: "gems",
    label: "Get More Gems",
    description: "Explore gem-earning opportunities",
    icon: Gem,
    variant: "purple",
  },
  {
    id: "earn",
    label: "Earn More Rewards",
    description: "Discover earning features",
    icon: Sparkles,
    variant: "gold",
  },
  {
    id: "ads",
    label: "Watch Ads",
    description: "Watch & earn instantly",
    icon: PlayCircle,
    variant: "blue",
  },
  {
    id: "refer",
    label: "Refer Friends",
    description: "Grow your referral network",
    icon: Users,
    variant: "green",
  },
  {
    id: "redeem",
    label: "Redeem Rewards",
    description: "Go to Payout / Wallet",
    icon: Wallet,
    variant: "silver",
  },
  {
    id: "achievements",
    label: "Achievements",
    description: "View badges and progress",
    icon: Award,
    variant: "gold",
  },
];

export default function QuickActions({ onAction }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Quick Actions</h2>
      <div className={styles.grid}>
        {actions.map(({ id, label, description, icon: Icon, variant }) => (
          <button
            key={id}
            className={styles.card}
            data-variant={variant}
            onClick={() => onAction?.(id)}
          >
            <div className={styles.iconWrap}>
              <Icon size={20} />
            </div>
            <div className={styles.textBlock}>
              <p className={styles.label}>{label}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <ChevronRight size={16} className={styles.chevron} />
          </button>
        ))}
      </div>
    </section>
  );
}