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
        <VEsCard 
          value={rewards.ves} 
          onAction={() => handleAssetAction('ves')}
        />

        {/* SVEs Card */}
        <SVEsCard 
          value={rewards.sves} 
          onAction={() => handleAssetAction('sves')}
        />

        {/* Gems Card */}
        <GemsCard 
          value={rewards.gems} 
          onAction={() => handleAssetAction('gems')}
        />

        {/* Tokens Card */}
        <TokensCard 
          value={rewards.tokens} 
          onAction={() => handleAssetAction('tokens')}
        />

        {/* XP Card */}
        <XPCard 
          value={rewards.xp} 
          onAction={() => handleAssetAction('xp')}
        />
      </div>
    </section>
  );
};

export default RewardAssets;