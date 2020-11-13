import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccessToken } from '../../../lib/store/actions';
import { getAuth } from '../../../lib/store/selectors/auth.selectors';

export default function Github() {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector(getAuth);

    const { code } = router.query;

    const [errored, setErrored] = useState(false);

    useEffect(() => {
        if (!auth.error && typeof router.query.code === 'string') {
            dispatch(fetchAccessToken({ code: router.query.code }));
        }
    }, [code]);

    if (auth.error) {
        return <>ERROR</>;
    }

    if (auth.token) {
        router.push('/');
    }

    return <>loading</>;
}
