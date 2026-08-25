import VEsCard from "./VEsCard/VEsCard";
import SVEsCard from "./SVEsCard/SVEsCard";
import GemsCard from "./GemsCard/GemsCard";
import TokensCard from "./TokensCard/TokensCard";
import XPCard from "./XPCard/XPCard";
import styles from "./RewardAssets.module.css";

export default function RewardAssets({ rewards }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Rewards</h2>
      </div>
      <div className={styles.grid}>
        <VEsCard value={rewards.ves} />
        <SVEsCard value={rewards.sves} />
        <GemsCard value={rewards.gems} />
        <TokensCard value={rewards.tokens} />
        <XPCard value={rewards.xp.current} level={rewards.xp.level} />
      </div>
    </section>
  );
}