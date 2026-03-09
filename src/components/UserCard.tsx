import type { ReactElement } from 'react';
import type { User } from '../types/user';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
}

const genderLabel: Record<string, string> = {
  male: 'Male',
  female: 'Female',
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        loading="lazy"
      />
      <div className={styles.body}>
        <div className={styles.nameRow}>
          <span className={styles.name}>
            {user.firstName} {user.lastName}
          </span>
          <span className={styles.badge}>{genderLabel[user.gender] ?? user.gender}</span>
        </div>
        <span className={styles.username}>@{user.username}</span>

        <div className={styles.info}>
          <InfoItem icon="envelope" label={user.email} href={`mailto:${user.email}`} />
          <InfoItem icon="phone" label={user.phone} />
          <InfoItem icon="building" label={`${user.company.title} · ${user.company.name}`} />
          <InfoItem icon="location" label={`${user.address.city}, ${user.address.country}`} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, href }: { icon: string; label: string; href?: string }) {
  const icons: Record<string, ReactElement> = {
    envelope: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="m2 6 8 6 8-6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4a1 1 0 0 1 1-1h2.28a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.23 1.02L6.9 9.22a11.05 11.05 0 0 0 3.88 3.88l1.22-1.22a1 1 0 0 1 1.02-.23l3.3 1.1a1 1 0 0 1 .68.95V16a1 1 0 0 1-1 1h-1C7.16 17 3 12.84 3 8V4z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    building: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="10" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 9h4a1 1 0 0 1 1 1v8H12V9z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 3h4a1 1 0 0 1 1 1v3H4V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 11h2M6 14h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    location: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 2a6 6 0 0 1 6 6c0 4-6 10-6 10S4 12 4 8a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  };

  const content = (
    <div className={styles.infoItem}>
      <span className={styles.infoIcon}>{icons[icon]}</span>
      <span className={styles.infoLabel}>{label}</span>
    </div>
  );

  return href ? <a href={href} className={styles.infoLink}>{content}</a> : content;
}