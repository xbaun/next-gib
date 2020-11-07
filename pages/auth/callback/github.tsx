import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getAuthToken } from '../../../lib/store/auth.selectors';
import { fetchAccessToken } from '../../../lib/store/auth.slice';
import fetch from 'isomorphic-unfetch';

export default function Github() {

    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector(getAuth);


    const { code } = router.query;


    // const [fetching, setFetching] = useState(false);

    const [errored, setErrored] = useState(false);

    useEffect(() => {

        if (!auth.error && typeof router.query.code === 'string') {
            dispatch(fetchAccessToken({ code: router.query.code }));
        }

        // const get = async (code: string) => {
        //
        //     const url = new URL('`/api/auth/github`', location.href)
        //     url.searchParams.append('code', code);
        //
        //     const data = await fetch(url.toString()).then(resp => resp.json());
        //
        // }
        //
        // if (!fetching) {
        //     if (typeof router.query.code === 'string') {
        //         get(router.query.code);
        //     }
        // }

    }, [code]);

    if (auth.error) {
        return (<>ERROR</>)
    }

    if (auth.token) {
        router.push('/');
    }

    return (<>loading</>)

    // if (errored) {
    //     return (<>ERROR</>)
    // } else {
    //     router.push('/');
    // }
}
