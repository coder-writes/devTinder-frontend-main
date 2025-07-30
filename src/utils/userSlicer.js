import { createSlice } from "@reduxjs/toolkit";

// Function to get initial state - check if we have a token
const getInitialState = () => {
    // Return null initially - user data will be fetched if token exists
    return null;
};

const userSlicer = createSlice({
    name: "user",
    initialState: getInitialState(),
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