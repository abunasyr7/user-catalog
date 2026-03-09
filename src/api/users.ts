import type { UsersResponse } from '../types/user';

const BASE_URL = 'https://dummyjson.com';
const LIMIT = 10;

export async function fetchUsers(page: number): Promise<UsersResponse> {
  const skip = (page - 1) * LIMIT;
  const res = await fetch(`${BASE_URL}/users?limit=${LIMIT}&skip=${skip}&select=id,firstName,lastName,maidenName,age,gender,email,phone,username,image,company,address`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function searchUsers(query: string, page: number): Promise<UsersResponse> {
  const skip = (page - 1) * LIMIT;
  const res = await fetch(`${BASE_URL}/users/search?q=${encodeURIComponent(query)}&limit=${LIMIT}&skip=${skip}&select=id,firstName,lastName,maidenName,age,gender,email,phone,username,image,company,address`);
  if (!res.ok) throw new Error('Failed to search users');
  return res.json();
}