import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import AuthGuard from '../lib/components/auth-guard';
import store from "../lib/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <AuthGuard redirect='/auth'>
                    <Component {...pageProps} />
                </AuthGuard>
            </Provider>
        </React.StrictMode>
    );
}

export default MyApp;
