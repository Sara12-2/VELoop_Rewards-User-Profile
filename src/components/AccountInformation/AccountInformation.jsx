import { useState } from "react";
import { ChevronDown, Copy, Check, ShieldCheck, Mail, Hash, Gift, Calendar } from "lucide-react";
import styles from "./AccountInformation.module.css";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export default function AccountInformation({ user }) {
  const [expanded, setExpanded] = useState(false);
  const { copy } = useCopyToClipboard();
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (field, value) => {
    copy(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const fields = [
    { key: "userId", label: "User ID", value: user.userId, icon: Hash, copyable: true },
    { key: "email", label: "Email", value: user.email, icon: Mail, copyable: false },
    { key: "referralCode", label: "Referral Code", value: user.referralCode, icon: Gift, copyable: true },
    { key: "memberSince", label: "Member Since", value: user.memberSince, icon: Calendar, copyable: false },
  ];

  return (
    <section className={styles.section}>
      <button
        className={styles.header}
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
      >
        <h2 className={styles.title}>Account Information</h2>
        <ChevronDown
          size={18}
          className={styles.chevron}
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {expanded && (
        <div className={styles.panel}>
          <div className={styles.grid}>
            {fields.map(({ key, label, value, icon: Icon, copyable }) => (
              <div key={key} className={styles.field}>
                <div className={styles.fieldIcon}>
                  <Icon size={15} />
                </div>
                <div className={styles.fieldTextBlock}>
                  <p className={styles.fieldLabel}>{label}</p>
                  <p className={styles.fieldValue}>{value}</p>
                </div>
                {copyable && (
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(key, value)}
                    aria-label={`Copy ${label}`}
                  >
                    {copiedField === key ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className={styles.securityRow}>
            <ShieldCheck size={15} className={styles.securityIcon} />
            <span>
              Email: <strong>{user.emailVerified ? "Verified" : "Unverified"}</strong>
            </span>
          </div>
        </div>
      )}
    </section>
  );
}