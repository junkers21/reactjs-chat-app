import { createSlice } from "@reduxjs/toolkit";
import { supabase } from 'src/supabaseClient';

const initialState = {
    user: null,
    loading: true,
    eventSet: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            console.log(action.payload);
            state.user = action.payload;
            state.loading = false;
        },
        setEventSet(state, action) {
            state.eventSet = action.payload;
        }
    },
});
  
export const { setUser, setEventSet } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectEventSet = (state) => state.auth.eventSet;

export const listenToAuthChanges = () => (dispatch) => {
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'INITIAL_SESSION') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'SIGNED_IN') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'SIGNED_OUT') {
            dispatch(setUser(null));
        } else if (event === 'PASSWORD_RECOVERY') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'TOKEN_REFRESHED') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'USER_UPDATED') {
            dispatch(setUser(session?.user ?? null));
        }
        
        dispatch(setEventSet(true));
    });
};

export default authSlice.reducer;