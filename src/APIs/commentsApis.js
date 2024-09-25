import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";


const BASE_URL = "https://jsonplaceholder.typicode.com/comments";


export const fetchComments = createAsyncThunk("comments/fetchComments", async (postId) => {
    const response = await axios.get(BASE_URL, {
        params: { postId },
    });
    return response.data;

})

export const addComment = createAsyncThunk("comments/addComment", async ({ postId, newComment }) => {
    const response = await axios.post(BASE_URL, {
        postId,
        ...newComment,
    });
    return response.data;

})

