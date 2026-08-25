import { CircleDollarSign, Info } from "lucide-react";
import { useState } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import styles from "./TokensCard.module.css";

export default function TokensCard({ value }) {
  const animated = useCountUp(value);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <CircleDollarSign size={20} />
        </div>
        <button
          className={styles.infoBtn}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="What are Tokens?"
        >
          <Info size={14} />
        </button>
      </div>

      <p className={styles.value}>{animated.toLocaleString()}</p>
      <p className={styles.label}>Tokens</p>

      {showInfo && (
        <div className={styles.tooltip}>
          Tokens can be used to unlock special earning opportunities within the platform.
        </div>
      )}
    </div>
  );
}