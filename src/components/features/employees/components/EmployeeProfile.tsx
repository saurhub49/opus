import { Box, Divider, Grid, TextField } from "@mui/material";
import GenericTab from "../../common/components/GenericTab";
import ProfileBanner from "./ProfileBanner";

const bio = 'Hunting things, saving people. The family business. Dean is known for handling a large number of weapons. His signature looks are black boots, a dark leather jacket and dark flannel shirts with dark blue jeans. He is also known for driving a signature black 1967 Chevrolet Impala, which he occasionally sleeps in, and he has a huge stash of weaponry in the trunk'

const EmployeeProfile: React.FC = () => {

    return (
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
                    <ProfileBanner initials="DW" name="Dean Winchester" role="Monster Hunter" bio={bio} />
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
    )
}

export default EmployeeProfile;