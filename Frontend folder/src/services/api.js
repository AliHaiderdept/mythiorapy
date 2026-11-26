const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function getToken() {
  return localStorage.getItem('mythiorapyToken');
}

export function saveSession(data) {
  localStorage.setItem('mythiorapyToken', data.token);
  localStorage.setItem('mythiorapyUser', JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem('mythiorapyToken');
  localStorage.removeItem('mythiorapyUser');
}

export async function apiRequest(path, options = {}) {
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export const register = (payload) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
export const login = (payload) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
export const logout = () => apiRequest('/auth/logout', { method: 'POST' });
export const getAssessments = () => apiRequest('/assessments');
export const getAssessment = (type) => apiRequest(`/assessments/${type}`);
export const submitAssessment = (type, answers) => apiRequest(`/assessments/${type}/submit`, { method: 'POST', body: JSON.stringify({ answers }) });
export const getDashboard = () => apiRequest('/dashboard');
export const createMood = (payload) => apiRequest('/mood', { method: 'POST', body: JSON.stringify(payload) });
export const sendChat = (message) => apiRequest('/chat', { method: 'POST', body: JSON.stringify({ message }) });
