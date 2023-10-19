import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import theme from '../../../../theme';

interface ProfileBannerProps {
    initials: string;
    name: string;
    role: string;
    bio: string;
}

const ProfileBanner: React.FC<ProfileBannerProps> = (props) => {
    const { initials, name, role, bio } = props;
    return (
        <>
            <Avatar
                sx={{
                    width: '160px',
                    height: '160px',
                    fontSize: '60px',
                    marginRight: '16px',
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4)',
                }}
            >
                {initials}
            </Avatar>
            <Paper
                elevation={24}
                style={{
                    backgroundImage: 'url("/profile-banner.png")',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    padding: '16px',
                    alignItems: 'center',
                    borderRadius: "20px"
                }}
            >
                <div>
                    <Typography variant="h4">{name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {role}
                    </Typography>
                    <Typography sx={{
                        textOverflow: 'ellipsis'
                    }} variant="body1">{bio}</Typography>
                </div>
            </Paper>
        </>
    );
}

export default ProfileBanner;