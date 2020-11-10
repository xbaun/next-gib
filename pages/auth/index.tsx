import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../lib/store/selectors/auth.selectors';

export default function Index() {
    const dispatch = useDispatch();
    const router = useRouter();
    const auth = useSelector(getAuth);

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

    // useEffect(() => {
    //     dispatch(fetchAccessTokenFromCache());
    // }, []);
    //
    // if (auth?.token) {
    //     router.push('/');
    // }

    return (
        <div>
            Auth! {auth?.token}
            <button
                onClick={() => {
                    location.href = '/api/auth/github';
                }}
            >
                Authenticate
            </button>
        </div>
    );
}
