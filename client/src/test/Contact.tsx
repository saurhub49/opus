import { Box, Divider, Grid, TextField } from "@mui/material";
import GenericTab from "../components/features/common/components/GenericTab";
import ProfileBanner from "../components/features/profile/components/ProfileBanner";

const bio = 'Hunting things, saving people. The family business. Dean is known for handling a large number of weapons. His signature looks are black boots, a dark leather jacket and dark flannel shirts with dark blue jeans. He is also known for driving a signature black 1967 Chevrolet Impala, which he occasionally sleeps in, and he has a huge stash of weaponry in the trunk'

const Contact = () => {
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
                            label: 'Item One',
                            node: <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                                    {Array.from(Array(9)).map((_, index) => (
                                        <Grid item xs={3} sm={6} md={3} key={index}>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Required"
                                                defaultValue="Hello World"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        },
                        {
                            label: 'Item Two',
                            node: <>Item Two</>
                        },
                        {
                            label: 'Item Three',
                            node: <>Item Three</>
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

export default Contact;