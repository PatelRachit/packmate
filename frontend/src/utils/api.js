// src/utils/api.js
const BASE = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

const token = () => localStorage.getItem('pm_token') || '';
const auth = () => ({ Authorization: `Bearer ${token()}` });
const json = () => ({ 'Content-Type': 'application/json' });

const handle = async (res) => {
  if (!res.ok) {
    const e = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(e.message || 'Request failed');
  }
  return res.json();
};

export const api = {
  // auth
  register: (d) =>
    fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: json(),
      body: JSON.stringify(d),
    }).then(handle),
  login: (d) =>
    fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: json(),
      body: JSON.stringify(d),
    }).then(handle),

  // trips
  getTrips: () => fetch(`${BASE}/api/trips`, { headers: auth() }).then(handle),
  getTrip: (id) => fetch(`${BASE}/api/trips/${id}`, { headers: auth() }).then(handle),
  createTrip: (d) =>
    fetch(`${BASE}/api/trips`, {
      method: 'POST',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
  updateTrip: (id, d) =>
    fetch(`${BASE}/api/trips/${id}`, {
      method: 'PUT',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
  deleteTrip: (id) =>
    fetch(`${BASE}/api/trips/${id}`, { method: 'DELETE', headers: auth() }).then(handle),

  // items
  getItems: (params = {}) =>
    fetch(`${BASE}/api/items?${new URLSearchParams(params)}`, { headers: auth() }).then(handle),
  createItem: (d) =>
    fetch(`${BASE}/api/items`, {
      method: 'POST',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
  updateItem: (id, d) =>
    fetch(`${BASE}/api/items/${id}`, {
      method: 'PUT',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
  deleteItem: (id) =>
    fetch(`${BASE}/api/items/${id}`, { method: 'DELETE', headers: auth() }).then(handle),

  // tips
  getTips: (p = {}) =>
    fetch(`${BASE}/api/tips?${new URLSearchParams(p)}`, { headers: auth() }).then(handle),
  createTip: (d) =>
    fetch(`${BASE}/api/tips`, {
      method: 'POST',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
  updateTip: (id, d) =>
    fetch(`${BASE}/api/tips/${id}`, {
      method: 'PUT',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
  deleteTip: (id) =>
    fetch(`${BASE}/api/tips/${id}`, { method: 'DELETE', headers: auth() }).then(handle),
  upvoteTip: (id) =>
    fetch(`${BASE}/api/tips/${id}/upvote`, { method: 'POST', headers: auth() }).then(handle),
  removeUpvote: (id) =>
    fetch(`${BASE}/api/tips/${id}/upvote`, { method: 'DELETE', headers: auth() }).then(handle),

  // user
  getMe: () => fetch(`${BASE}/api/users/me`, { headers: auth() }).then(handle),
  updateMe: (d) =>
    fetch(`${BASE}/api/users/me`, {
      method: 'PUT',
      headers: { ...json(), ...auth() },
      body: JSON.stringify(d),
    }).then(handle),
};
