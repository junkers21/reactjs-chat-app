import { createSlice } from "@reduxjs/toolkit";
import { supabase } from 'src/supabaseClient';

const initialState = {
    user: null,
    profile: null,
    loading: true,
    eventSet: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.loading = false;
        },
        setProfile(state, action) {
            state.profile = action.payload;
            state.loading = false;
        },
        setEventSet(state, action) {
            state.eventSet = action.payload;
        }
    },
});
  
export const { setUser, setEventSet, setProfile } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectProfile = (state) => state.auth.profile;
export const selectLoading = (state) => state.auth.loading;
export const selectEventSet = (state) => state.auth.eventSet;

let authSubscription = null;
export const listenToAuthChanges = () => async (dispatch) => {
    if (authSubscription) { return; }
    authSubscription = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(event);
        if (event === 'INITIAL_SESSION') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'SIGNED_IN') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'SIGNED_OUT') {
            dispatch(setUser(null));
            dispatch(setProfile(null));
        } else if (event === 'PASSWORD_RECOVERY') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'TOKEN_REFRESHED') {
            dispatch(setUser(session?.user ?? null));
        } else if (event === 'USER_UPDATED') {
            dispatch(setUser(session?.user ?? null));
        }
    });

    dispatch(setEventSet(true));
};

export const getProfile = () => (id) => {
    return supabase.from('profiles').select('id').eq('id', id).single();
};

export default authSlice.reducer;