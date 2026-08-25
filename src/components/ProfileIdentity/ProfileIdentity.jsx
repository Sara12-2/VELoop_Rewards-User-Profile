import { Hash, Mail, Gift, Star, Copy, Check } from "lucide-react";
import styles from "./ProfileIdentity.module.css";
import { useState } from "react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export default function ProfileIdentity({ user, level, levelName }) {
  const { copy } = useCopyToClipboard();
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (field, value) => {
    copy(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const fields = [
    {
      key: "userId",
      label: "User ID",
      value: user.userId,
      icon: Hash,
      copyable: true,
    },
    {
      key: "email",
      label: "Email",
      value: user.email,
      icon: Mail,
      copyable: false,
    },
    {
      key: "referralCode",
      label: "Referral Code",
      value: user.referralCode,
      icon: Gift,
      copyable: true,
    },
    {
      key: "level",
      label: "Current Level",
      value: `Level ${String(level).padStart(2, "0")} — ${levelName}`,
      icon: Star,
      copyable: false,
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Profile Information</h2>
      <div className={styles.grid}>
        {fields.map(({ key, label, value, icon: Icon, copyable }) => (
          <div key={key} className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon size={16} />
            </div>
            <div className={styles.textBlock}>
              <p className={styles.label}>{label}</p>
              <p className={styles.value}>{value}</p>
            </div>
            {copyable && (
              <div className={styles.copyWrap}>
                <button
                  className={styles.copyBtn}
                  onClick={() => handleCopy(key, value)}
                  aria-label={`Copy ${label}`}
                >
                  {copiedField === key ? <Check size={14} /> : <Copy size={14} />}
                </button>
                {copiedField === key && (
                  <span className={styles.toast} role="status">Copied!</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}