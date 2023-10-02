import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCredentials } from './slices/authSlices';
import { useRegisterMutation } from './slices/userApiSlices';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await register({ name, email, password }).unwrap();
    dispatch(setCredentials({ ...res }));
    navigate('/posts');
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/posts');
    }
  }, [navigate, userInfo]);
  return (
    <>
      <h1>Register</h1>
      <br />

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default RegisterScreen;
