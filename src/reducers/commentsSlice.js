import { createSlice } from "@reduxjs/toolkit";


import { fetchComments, addComment } from "../APIs/commentsApis";

export const commentsSlice = createSlice({
    name: "commentsData",

    initialState: {
        comments: [],
        setLoading: false,
    },

    reducers: {},

    extraReducers: (builder) => {

        builder.addCase(fetchComments.pending, (state) => {
            state.setLoading = true;
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.setLoading = false;
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comments = [...state.comments, action.payload]
        });
    }
});


export default commentsSlice.reducer;