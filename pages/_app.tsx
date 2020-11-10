import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import AuthGuard from '../lib/components/auth-guard';
import { store } from '../lib/store';
import { fetchAccessTokenFromCache } from '../lib/store/actions';
import '../styles/globals.css';

store.dispatch(fetchAccessTokenFromCache());
const theme = createMuiTheme();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AuthGuard redirect='/auth'>
                    <Component {...pageProps} />
                </AuthGuard>
            </Provider>
        </ThemeProvider>
        // </React.StrictMode>
    );
}

export default MyApp;
