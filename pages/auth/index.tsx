import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../../lib/store/auth.selectors';

export default function Index() {

    const dispatch = useDispatch()
    const authToken = useSelector(getAuthToken);

    // const [getIsAuthenticating, setIsAuthenticating] = useState(false);
    //
    // console.log(getIsAuthenticating, Date.now())
    //
    // useEffect(() => {
    //     if (!getIsAuthenticating) {
    //         setIsAuthenticating(true);
    //         dispatch(login());
    //     }
    // }, [getIsAuthenticating]);

    // useEffect(() => {
    //     dispatch(fetchUserAccessToken(22));
    // }, [])

    return (
        <div>
            Auth! {authToken}
            <button onClick={() => { location.href = '/api/auth/github' }}>Authenticate</button>
        </div>
    )
}


