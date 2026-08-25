import { Coins, Info } from "lucide-react";
import { useState } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import styles from "./VEsCard.module.css";

export default function VEsCard({ value }) {
  const animated = useCountUp(value);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <Coins size={20} />
        </div>
        <button
          className={styles.infoBtn}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="What are VEs?"
        >
          <Info size={14} />
        </button>
      </div>

      <p className={styles.value}>{animated.toLocaleString()}</p>
      <p className={styles.label}>VEs</p>

      {showInfo && (
        <div className={styles.tooltip}>
          VEs are the primary virtual reward currency used within VELOOP Rewards.
        </div>
      )}
    </div>
  );
}