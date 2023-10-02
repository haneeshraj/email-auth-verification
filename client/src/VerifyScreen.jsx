import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useVerifyQuery } from './slices/userApiSlices';
import { setCredentials } from './slices/authSlices';

const VerifyScreen = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const uid = searchParams.get('uid');

  const { data, isLoading, error } = useVerifyQuery(uid);

  dispatch(setCredentials({ ...data }));

  return (
    <div>
      {!uid
        ? 'invalid tiing'
        : error
        ? error.data.message || error?.error
        : 'successful'}
    </div>
  );
};

export default VerifyScreen;
