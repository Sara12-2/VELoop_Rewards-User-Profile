import { Zap, Info } from "lucide-react";
import { useState } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import styles from "./XPCard.module.css";

export default function XPCard({ value, level }) {
  const animated = useCountUp(value);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <Zap size={20} />
        </div>
        <button
          className={styles.infoBtn}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="What is XP?"
        >
          <Info size={14} />
        </button>
      </div>

      <p className={styles.value}>{animated.toLocaleString()}</p>
      <p className={styles.label}>XP · Level {level}</p>

      {showInfo && (
        <div className={styles.tooltip}>
          XP reflects your overall activity and determines your level progression.
        </div>
      )}
    </div>
  );
}