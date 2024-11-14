import { createStore } from 'redux';

export const RootState = {
  auth: {
    isAuthenticated: true,
    user: {
      role: 'admin',
    },
  },
};

export default createStore(() => RootState);
