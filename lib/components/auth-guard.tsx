import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../store/auth.selectors';

export default function AuthGuard({ children, redirect, fallback }: InferProps<typeof AuthGuard.propTypes>) { // { children: React.ReactElement }) {
    React.Children.only(children);

    const router = useRouter();
    const authToken = useSelector(getAuthToken);

    const [pending, setPending] = useState(true);

    useEffect(() => {

        const path = authToken ? fallback ?? '/' : redirect;

        if (!router.route.startsWith(path)) {
            typeof window !== "undefined" && router.push(path);
        } else {
            setPending(false);
        }

        // if (authToken)  {
        //     if (!router.route.startsWith(fallback!)) {
        //         typeof window !== "undefined" && router.push(fallback!);
        //     } else {
        //         setPending(false);
        //     }
        // } else {
        //     if (!router.route.startsWith(redirect!)) {
        //         typeof window !== "undefined" && router.push(redirect);
        //     } else {
        //         setPending(false);
        //     }
        // }

        // if (authToken === undefined && !router.route.startsWith(redirect)) {
        //     typeof window !== "undefined" && router.push(redirect);
        // } else {
        //     setPending(false);
        // }

    });

    // if (authToken === undefined) {
    //     // location.href = '/api/auth/github'
    //     // if (children.type !== AuthIndexPage) {
    //     //     typeof window !== 'undefined' && router.push('/auth');
    //     // }
    //     // return (<></>);
    //
    //     console.log(router, children.type)
    //
    //     return (<></>);
    // }

    if (pending) {
        return <>...</>;
    } else {
        return <>{children}</>;
    }
}

AuthGuard.propTypes = {
    fallback: PropTypes.string,
    redirect: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
};
