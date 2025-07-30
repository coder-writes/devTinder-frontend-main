import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        }
    }
});


export const { setUser, removeUser } = userSlicer.actions;
export default userSlicer.reducer;