import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, searchUsers } from '../api/users';
import type { User } from '../types/user';

interface UseUsersResult {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  page: number;
  query: string;
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
  totalPages: number;
}

interface State {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
}

const LIMIT = 10;

export function useUsers(): UseUsersResult {
  const [state, setState] = useState<State>({ users: [], total: 0, loading: true, error: null });
  const [page, setPage] = useState(1);
  const [query, setQueryState] = useState('');

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
    setPage(1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    const load = query.trim()
      ? searchUsers(query.trim(), page)
      : fetchUsers(page);

    load
      .then((data) => {
        if (!cancelled) {
          setState({ users: data.users, total: data.total, loading: false, error: null });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: err.message }));
        }
      });

    return () => { cancelled = true; };
  }, [query, page]);

  return {
    users: state.users,
    total: state.total,
    loading: state.loading,
    error: state.error,
    page,
    query,
    setPage,
    setQuery,
    totalPages: Math.ceil(state.total / LIMIT),
  };
}