import { Sparkles, Info } from "lucide-react";
import { useState } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import styles from "./GemsCard.module.css";

export default function GemsCard({ value }) {
  const animated = useCountUp(value);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <Sparkles size={20} />
        </div>
        <button
          className={styles.infoBtn}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="What are Gems?"
        >
          <Info size={14} />
        </button>
      </div>

      <p className={styles.value}>{animated.toLocaleString()}</p>
      <p className={styles.label}>Gems</p>

      {showInfo && (
        <div className={styles.tooltip}>
          Gems are collectible rewards earned through activities and milestones.
        </div>
      )}
    </div>
  );
}