export const AUTH_KEY = 'rbt_auth_status';

export const setAuthStatus = (status: boolean) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(status));
};

export const getAuthStatus = (): boolean => {
  const status = localStorage.getItem(AUTH_KEY);
  return status ? JSON.parse(status) : false;
};

export const clearAuthStatus = () => {
  localStorage.removeItem(AUTH_KEY);
};