import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../../global/redux/hooks';
import { loginAction } from '../actions/authAsyncThunkActions.action';
import WelcomeFormContainer from './WelcomeFormContainer';
import { JwtRequest } from '../../../openapi';
import useGenericState from '../../features/common/hooks/useGenericState.hook';
import GenericTextField from '../../features/common/components/GenericTextField';
import GenericButton from '../../features/common/components/GenericButton';
import { useNavigate } from 'react-router-dom';

const initialLoginState: JwtRequest = {
  email: '',
  password: '',
}

const Login: React.FC = () => {
  const { state, onChangeHandler } = useGenericState(initialLoginState);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const onSubmitHandler = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(loginAction(state))
      .then(() => {
        console.log('login success');
        window.location.reload();
      });
  }, [dispatch, state]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token && token !== '') {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <WelcomeFormContainer>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <GenericTextField<JwtRequest, 'email'>
            id='email'
            field='email'
            label='Email'
            onChange={onChangeHandler}
            required
            value={state.email}
            variant='outlined'
            sx={{
              my: 1,
            }}
          />
          <GenericTextField<JwtRequest, 'password'>
            id='password'
            type='password'
            field='password'
            label='Password'
            onChange={onChangeHandler}
            required
            value={state.password}
            variant='outlined'
            sx={{
              my: 1,
            }}
          />
          <GenericButton
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            onClick={onSubmitHandler}
            loading={loading}
          >
            Sign In
          </GenericButton>
        </Box>
      </Box>
    </WelcomeFormContainer>
  );
}

export default Login;