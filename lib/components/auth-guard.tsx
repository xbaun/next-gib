import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../store/selectors/auth.selectors';

export default function AuthGuard({
    children,
    redirect,
    fallback
}: InferProps<typeof AuthGuard.propTypes>) {
    React.Children.only(children);

    const router = useRouter();
    const authToken = useSelector(getAuthToken);

    const [pending, setPending] = useState(true);

    useEffect(() => {
        const path = authToken ? fallback ?? '/' : redirect;

        if (!router.route.startsWith(path)) {
            typeof window !== 'undefined' && router.push(path);
        } else {
            setPending(false);
        }
    });

    if (pending) {
        return <>...</>;
    } else {
        return <>{children}</>;
    }
}

AuthGuard.propTypes = {
    fallback: PropTypes.string,
    redirect: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired
};
