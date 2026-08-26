import { useState } from 'react';
import {
  User, Mail, Link2, Calendar,
  Shield, CheckCircle2, AlertCircle,
  Lock, Key, Bell, Globe, Smartphone, CreditCard,
  Copy, Check, Sparkles
} from 'lucide-react';
import styles from './AccountInformation.module.css';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const AccountInformation = ({ user }) => {
  const { copy } = useCopyToClipboard();
  const [copiedField, setCopiedField] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleCopy = (text, field) => {
    copy(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const accountFields = [
    {
      id: 'userId',
      icon: <User size={16} />,
      label: 'User ID',
      value: user.userId || 'VLRUSR202600123',
      copyable: true,
      color: '#FFD700'
    },
    {
      id: 'email',
      icon: <Mail size={16} />,
      label: 'Email Address',
      value: user.email || 'user@veloop.com',
      copyable: false,
      color: '#60A5FA',
      verified: true
    },
    {
      id: 'referralCode',
      icon: <Link2 size={16} />,
      label: 'Referral Code',
      value: user.referralCode || 'VELOOP123',
      copyable: true,
      color: '#B388FF'
    },
    {
      id: 'memberSince',
      icon: <Calendar size={16} />,
      label: 'Member Since',
      value: user.memberSince || 'January 2024',
      copyable: false,
      color: '#81C784'
    },
    {
      id: 'status',
      icon: <Shield size={16} />,
      label: 'Account Status',
      value: 'Active',
      copyable: false,
      color: '#81C784',
      status: true
    }
  ];

  const securityItems = [
    {
      id: 'emailVerification',
      icon: <Mail size={14} />,
      label: 'Email Verification',
      status: 'Verified',
      verified: true,
      color: '#81C784'
    },
    {
      id: 'loginSecurity',
      icon: <Lock size={14} />,
      label: 'Login Security',
      status: 'Active',
      verified: true,
      color: '#81C784'
    },
    {
      id: 'twoFactor',
      icon: <Key size={14} />,
      label: 'Two-Factor Auth',
      status: 'Disabled',
      verified: false,
      color: '#FBBF24'
    },
    {
      id: 'deviceManagement',
      icon: <Smartphone size={14} />,
      label: 'Device Management',
      status: '2 Devices',
      verified: true,
      color: '#60A5FA'
    }
  ];

  return (
    <section className={`${styles.section} ${isVisible ? styles.sectionVisible : ''}`}>
      <div className={styles.backgroundGlow}></div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Shield size={18} />
          </div>
          <h3 className={styles.title}>Account Information</h3>
          <span className={styles.headerBadge}>
            <CheckCircle2 size={10} />
            Secure
          </span>
        </div>
      </div>

      {/* Content - Always Visible */}
      <div className={styles.content}>
        {/* Account Fields */}
        <div className={styles.fieldsGrid}>
          {accountFields.map((field) => (
            <div key={field.id} className={styles.fieldCard}>
              <div className={styles.fieldIconWrapper} style={{ color: field.color }}>
                {field.icon}
              </div>
              <div className={styles.fieldContent}>
                <span className={styles.fieldLabel}>{field.label}</span>
                <div className={styles.fieldValueWrapper}>
                  <span className={styles.fieldValue}>{field.value}</span>
                  {field.copyable && (
                    <button
                      className={styles.fieldCopyBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(field.value, field.id);
                      }}
                    >
                      {copiedField === field.id ? (
                        <Check size={14} className={styles.copySuccess} />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                  {field.status && (
                    <span className={styles.statusBadge}>
                      <CheckCircle2 size={12} />
                      Active
                    </span>
                  )}
                  {field.verified && (
                    <span className={styles.verifiedBadge}>
                      <CheckCircle2 size={12} />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Section */}
        <div className={styles.securitySection}>
          <div className={styles.securityHeader}>
            <div className={styles.securityTitle}>
              <Shield size={16} className={styles.securityIcon} />
              <span>Account Security</span>
            </div>
          </div>

          <div className={styles.securityGrid}>
            {securityItems.map((item) => (
              <div key={item.id} className={styles.securityItem}>
                <div className={styles.securityItemIcon} style={{ color: item.color }}>
                  {item.icon}
                </div>
                <div className={styles.securityItemContent}>
                  <span className={styles.securityItemLabel}>{item.label}</span>
                  <span className={`${styles.securityItemStatus} ${item.verified ? styles.statusVerified : styles.statusUnverified}`}>
                    {item.verified ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <AlertCircle size={12} />
                    )}
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.accountActions}>
          <button className={styles.actionBtn}>
            <Bell size={14} />
            Notifications
          </button>
          <button className={styles.actionBtn}>
            <Globe size={14} />
            Language
          </button>
          <button className={styles.actionBtn}>
            <CreditCard size={14} />
            Payments
          </button>
          <button className={styles.actionBtn}>
            <Key size={14} />
            Security
          </button>
        </div>

        {/* Trust Message */}
        <div className={styles.trustMessage}>
          <Sparkles size={14} className={styles.trustIcon} />
          <span>
            Your rewards, achievements, referrals, and withdrawal activity 
            are all tracked securely in one place.
          </span>
        </div>
      </div>
    </section>
  );
};

export default AccountInformation;