import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toasts: []
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        addToast: (state, action) => {
            action.payload.id = Math.floor(Math.random() * 10000000);
            return {
                ...state,
                toasts: [...state.toasts, action.payload],
            }
        },
        remove: (state, action) => {
            const updatedToasts = state.toasts.filter(
                (toast) => toast.id !== action.payload
            );
            return {
                ...state,
                toasts: updatedToasts,
            };
        }
    },
});
  
export const { addToast, remove } = toastSlice.actions;
export default toastSlice.reducer;