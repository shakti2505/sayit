import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { AuthState } from '../components/auth/authSlices';


const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

// Define RootState for strong typing in selectors
export interface RootState {
  auth: AuthState;
}
