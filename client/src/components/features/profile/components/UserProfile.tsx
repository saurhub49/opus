import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import useGenericState from "../../common/hooks/useGenericState.hook";
import { useUpdateProfileMutation } from "../apis/profile.api";
import { profileAction } from "../../../welcome/actions/authAsyncThunkActions.action";
import { Box, Divider, Grid, TextField } from "@mui/material";
import GenericTab from "../../common/components/GenericTab";
import ProfileBanner from "./ProfileBanner";
import CircularLoading from "../../common/components/CircularLoading";


const UserProfile: React.FC = () => {
    const { profile, loading } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const { state, setState, onChangeHandler } = useGenericState(profile);
    const [updateProfile, updateProfileResult] = useUpdateProfileMutation();

    useEffect(() => {
        if (!loading) {
            setState(profile);
        }
    }, [loading, profile, setState]);

    const onSubmitHandler = useCallback(() => {
        if (!!state) {
            updateProfile(state);
        }
    }, [state, updateProfile]);

    useEffect(() => {
        if (updateProfileResult.isSuccess && !updateProfileResult.isLoading) {
            dispatch(profileAction());
        }
    }, [dispatch, updateProfileResult.isLoading, updateProfileResult.isSuccess])

    return (
        !!state && !loading ?
            <Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    //height="74vh"
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                    gap={3}
                >
                    <Box
                        //bgcolor={blueGrey[100]}
                        height="40%"
                        width="100%"
                        display="flex"
                        gap={1}
                        alignItems="center"
                        justifyContent="center"
                    //borderRadius="40px"
                    //boxShadow={3}
                    >
                        {state.firstName && state.lastName && <ProfileBanner initials={state.firstName.charAt(0) + state.lastName.charAt(0)} name={state.firstName + ' ' + state.lastName} role={state.roleTypeName ?? ''} bio={''} />}
                    </Box>
                    <Divider />
                    <Box
                        //bgcolor={blueGrey[100]}
                        height="60%"
                        width="100%"
                        display="flex"
                        //alignItems="center"
                        justifyContent="center"
                        borderRadius="20px"
                        boxShadow={24}
                    >
                        <GenericTab items={[
                            {
                                label: 'Personal',
                                node: <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="First Name"
                                                defaultValue="Dean"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Middle Name"
                                                defaultValue="John"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Last Name"
                                                defaultValue="Winchester"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Gender"
                                                defaultValue="Male"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Email"
                                                defaultValue="dean@supernatural.com"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Phone Number"
                                                defaultValue="7507811018"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="DOB"
                                                defaultValue="24th Sept 1888"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Marital Status"
                                                defaultValue="Single"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Nationality"
                                                defaultValue="American"
                                            />
                                        </Grid>
                                        <Grid item xs={3} sm={6} md={3}>
                                            <TextField
                                                required
                                                id="outlined-multiline-static"
                                                multiline
                                                label="Address"
                                                rows={4}
                                                defaultValue="302, Lawrence, Kansas302, Lawrence, Kansas302, Lawrence, Kansas302, Lawrence, Kansas302, Lawrence, Kansas"
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            },
                            {
                                label: 'Employee Details',
                                node: <>Employee Details</>
                            },
                            {
                                label: 'Tasks',
                                node: <>Tasks</>
                            },
                            {
                                label: 'Item Four',
                                node: <>Item Four</>
                            },
                        ]} />
                    </Box>
                </Box>
            </Box>
            : <CircularLoading />
    )
}

export default UserProfile;