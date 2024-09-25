import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "../reducers/commentsSlice";
import postsSlice from "../reducers/postsSlice";

export default configureStore({
    reducer: {
        postsData: postsSlice,
        commentsData: commentsSlice,
    }
})