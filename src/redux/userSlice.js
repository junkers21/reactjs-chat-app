import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    token: null,
    description: null,
    email: null,
    avatar_url: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { id, token, description, email, avatar_url } = action.payload;
            state.id = id;
            state.token = token;
            state.description = description;
            state.email = email;
            state.avatar_url = avatar_url;
        },
        clearUser: (state, _) => {
            state.id = null;
            state.token = null;
            state.description = null;
            state.email = null;
            state.avatar_url = null;
        },
    },
});
  
  export const { addUser, clearUser } = userSlice.actions;
  export default userSlice.reducer;