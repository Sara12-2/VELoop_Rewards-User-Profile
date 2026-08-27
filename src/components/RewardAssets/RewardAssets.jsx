import { useState } from 'react';
import { Trophy, Award } from 'lucide-react';
import styles from './RewardAssets.module.css';
import VEsCard from './VEsCard/VEsCard';
import SVEsCard from './SVEsCard/SVEsCard';
import GemsCard from './GemsCard/GemsCard';
import TokensCard from './TokensCard/TokensCard';
import XPCard from './XPCard/XPCard';

const RewardAssets = ({ rewards, onAction }) => {
  const [hoveredAsset, setHoveredAsset] = useState(null);

  const handleAssetAction = (assetId) => {
    console.log(`Action triggered for: ${assetId}`);
    if (onAction) {
      onAction(assetId);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Trophy size={18} />
          </div>
          <h3 className={styles.title}>Your Rewards</h3>
        </div>
        <span className={styles.totalBadge}>
          <span className={styles.totalCount}>5</span>
          Assets
        </span>
      </div>

      <div className={styles.assetsGrid}>
        {/* VEs Card */}
        <div className={`${styles.assetCard} ${styles.vesCard}`}>
          <VEsCard 
            value={rewards.ves} 
            onAction={() => handleAssetAction('ves')}
          />
        </div>

        {/* SVEs Card */}
        <div className={`${styles.assetCard} ${styles.svesCard}`}>
          <SVEsCard 
            value={rewards.sves} 
            onAction={() => handleAssetAction('sves')}
          />
        </div>

        {/* Gems Card */}
        <div className={`${styles.assetCard} ${styles.gemsCard}`}>
          <GemsCard 
            value={rewards.gems} 
            onAction={() => handleAssetAction('gems')}
          />
        </div>

        {/* Tokens Card */}
        <div className={`${styles.assetCard} ${styles.tokensCard}`}>
          <TokensCard 
            value={rewards.tokens} 
            onAction={() => handleAssetAction('tokens')}
          />
        </div>

        {/* XP Card */}
        <div className={`${styles.assetCard} ${styles.xpCard}`}>
          <XPCard 
            value={rewards.xp} 
            onAction={() => handleAssetAction('xp')}
          />
        </div>
      </div>
    </section>
  );
};

export default RewardAssets;