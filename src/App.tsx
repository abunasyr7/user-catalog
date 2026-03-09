import { useUsers } from './hooks/useUsers';
import { UserCard } from './components/UserCard';
import { SearchBar } from './components/SearchBar';
import { Pagination } from './components/Pagination';
import styles from './App.module.css';

function App() {
  const { users, total, loading, error, page, query, setPage, setQuery, totalPages } = useUsers();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>User Catalog</h1>
            {!loading && !error && (
              <span className={styles.count}>{total} users</span>
            )}
          </div>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            <strong>Something went wrong:</strong> {error}
          </div>
        )}

        {loading ? (
          <div className={styles.grid}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className={styles.empty}>
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="18" stroke="#d1d5db" strokeWidth="3"/>
              <path d="m42 42 12 12" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
              <path d="M21 25h14M21 31h8" stroke="#d1d5db" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <p>No users found for <strong>"{query}"</strong></p>
          </div>
        ) : (
          <div className={styles.grid}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className={styles.paginationRow}>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;