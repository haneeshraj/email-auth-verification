import { useSearchParams } from 'react-router-dom';

const VerifyScreen = () => {
  const [searchParams] = useSearchParams();

  const uid = searchParams.get('uid');

  return <div>{!uid ? 'invalid tiing' : 'message'}</div>;
};

export default VerifyScreen;
