import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(local);
    }, 400);
    return () => clearTimeout(timeout);
  }, [local, onChange]);

  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16z" stroke="currentColor" strokeWidth="2"/>
        <path d="m19 19-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="Search by name..."
        value={local}
        onChange={(e) => setLocal(e.target.value)}
      />
      {local && (
        <button className={styles.clear} onClick={() => { setLocal(''); onChange(''); }} aria-label="Clear">
          <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}