import { useParams } from "react-router-dom";
import { ConfirmUserDTO } from "../../../openapi";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import GenericButton from "../../features/common/components/GenericButton";
import GenericTextField from "../../features/common/components/GenericTextField";
import useGenericState from "../../features/common/hooks/useGenericState.hook";
import WelcomeFormContainer from "./WelcomeFormContainer";
import { useConfirmUserMutation } from "../apis/auth.api";


const initialConfirmUserState: ConfirmUserDTO = {
    token: '',
    password: '',
    confirmPassword: '',
}

const ConfirmUser: React.FC = () => {
    const { token } = useParams();
    const { state, onChangeHandler } = useGenericState(initialConfirmUserState);
    const [confirmUser, confirmUserResult] = useConfirmUserMutation();

    const onSubmitHandler = React.useCallback(() => {
        const requestConfirmUser: ConfirmUserDTO = {
            ...state,
            token: token ?? '',
        }
        confirmUser(requestConfirmUser);
    }, [confirmUser, state, token]);

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
                Confirm Password
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <GenericTextField<ConfirmUserDTO, 'password'>
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
                    <GenericTextField<ConfirmUserDTO, 'confirmPassword'>
                        field='confirmPassword'
                        label='Confirm Password'
                        onChange={onChangeHandler}
                        required
                        value={state.confirmPassword}
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
                        loading={confirmUserResult.isLoading}
                    >
                        Confirm
                    </GenericButton>
                </Box>
            </Box>
        </WelcomeFormContainer>
    )
}

export default ConfirmUser;