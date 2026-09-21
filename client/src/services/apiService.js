import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'x-treasury-key': 'finvault_sec_live_prod_key_7719'
  }
});

export const fetchTreasurySummary = async () => {
  const res = await apiClient.get('/analytics/summary');
  return res.data;
};

export const fetchAccounts = async () => {
  const res = await apiClient.get('/accounts');
  return res.data;
};

export const fetchPools = async () => {
  const res = await apiClient.get('/pools');
  return res.data;
};

export const fetchFxExposure = async () => {
  const res = await apiClient.get('/fx/exposure');
  return res.data;
};

export const triggerPoolSweep = async (poolId, sweepType) => {
  const res = await apiClient.post(`/pools/${poolId}/sweep`, { sweepType });
  return res.data;
};

export default apiClient;
