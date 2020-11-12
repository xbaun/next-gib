import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from '../../lib/store/selectors/auth.selectors';

export default function Index() {
    const auth = useSelector(getAuth);

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
