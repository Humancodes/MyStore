import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/types/auth';

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true, // Start with loading true to check auth state
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: state => {
      state.error = null;
    },
    logout: state => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, setError, clearError, logout } =
  authSlice.actions;

export default authSlice.reducer;
