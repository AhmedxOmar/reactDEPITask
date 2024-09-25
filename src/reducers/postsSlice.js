import { createSlice } from "@reduxjs/toolkit";

import { fetchPosts, addPost, updatePost, deletePost } from "../APIs/postsApis"

export const postsSlice = createSlice({
    name: "postsData",
    initialState: {
        posts: [],
        setLoading: false,
        setError: false,
    },

    reducers: [],

    extraReducers: (builder) => {

        builder.addCase(fetchPosts.pending, (state) => {
            state.setLoading = true;
            state.setError = null;
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.setLoading = false;
        })
        builder.addCase(addPost.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.posts.push(action.payload);
        })
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const postIndex = state.posts.findIndex(
                (post) => post.id === action.payload.id
            );

            if (postIndex !== -1) {
                state.posts[postIndex] = action.payload;
            }
        });

        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        });
    },
});


export default postsSlice.reducer;