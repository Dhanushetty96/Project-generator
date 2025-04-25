// templateSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async fetch action
export const fetchTemplates = createAsyncThunk(
    "template/fetchTemplates",
    async () => {
        const res = await fetch("/api/templates");
        const data = await res.json();
        return data;
    }
);

const templateSlice = createSlice({
    name: "template",
    initialState: {
        templates: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTemplates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTemplates.fulfilled, (state, action) => {
                state.loading = false;
                state.templates = action.payload;
            })
            .addCase(fetchTemplates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default templateSlice.reducer;
