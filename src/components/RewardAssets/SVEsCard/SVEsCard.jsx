import { Gem, Info } from "lucide-react";
import { useState } from "react";
import { useCountUp } from "../../../hooks/useCountUp";
import styles from "./SVEsCard.module.css";

export default function SVEsCard({ value }) {
  const animated = useCountUp(value);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconWrap}>
          <Gem size={20} />
        </div>
        <button
          className={styles.infoBtn}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="What are SVEs?"
        >
          <Info size={14} />
        </button>
      </div>

      <p className={styles.value}>{animated.toLocaleString()}</p>
      <p className={styles.label}>SVEs</p>

      {showInfo && (
        <div className={styles.tooltip}>
          SVEs are a premium reward tier that can be converted for additional benefits.
        </div>
      )}
    </div>
  );
}