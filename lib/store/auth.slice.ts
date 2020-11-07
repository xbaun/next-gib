import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import fetch from "isomorphic-unfetch";

type InitialState = {
    token: string | undefined;
    error: boolean;
    authenticating: boolean;
};

export const initialState: InitialState = {
    token: undefined,
    error: false,
    authenticating: false,
};

export const fetchAccessToken = createAsyncThunk<{ data?: { token: string }, error: boolean }, { code: string }>(
    "auth/fetchAccessToken",
    async ({ code }) => {
        console.log("login.fulfilled", "start");

        const url = new URL(`/api/auth/github`, location.href);
        url.searchParams.append("code", code);

        const data = await fetch(url.toString()).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return undefined;
            }
        });

        if (data && "accessToken" in data && data.accessToken) {
            return { error: false, data: { token: data.accessToken } };
        } else {
            return { error: true };
        }


    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccessToken.fulfilled, (state, action) => {
                console.log("login.fulfilled", action);
                return { ...state, authenticating: false, error: action.payload.error, token: action.payload.data?.token };
            })
            .addCase(fetchAccessToken.pending, (state, action) => {
                console.log("login.pending", action);
                return { ...state, authenticating: true, error: false };
            });
    },
});

export const { } = authSlice.actions;

export default authSlice.reducer;
