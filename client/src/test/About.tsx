import { Container, Typography, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";


const About = () => {
    const [selectedMail, setSelectedMail] = useState<number | null>(null);

    const handleMailSelect = (mailId: number) => {
        setSelectedMail(mailId);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Outlook Mail UI
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper elevation={3}>
                        <MailList onSelect={handleMailSelect} selectedMail={selectedMail} />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper elevation={3}>
                        <MailDetails mailId={selectedMail} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

interface MailListProps {
    onSelect: (mailId: number) => void;
    selectedMail: number | null;
}

const mails = [
    { id: 1, subject: 'Meeting Tomorrow', read: false },
    { id: 2, subject: 'Report Submission', read: true },
    // Add more mail items as needed
];

const MailList: React.FC<MailListProps> = ({ onSelect, selectedMail }) => {
    return (
        <List>
            <Typography variant="h6" align="center" gutterBottom>
                Mails
            </Typography>
            {mails.map((mail) => (
                <ListItem
                    key={mail.id}
                    button
                    selected={selectedMail === mail.id}
                    onClick={() => onSelect(mail.id)}
                >
                    <ListItemText primary={mail.subject} />
                </ListItem>
            ))}
        </List>
    );
};

interface MailDetailsProps {
    mailId: number | null;
}

const mailDetails = [
    { id: 1, subject: 'Meeting Tomorrow', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', read: false },
    { id: 2, subject: 'Report Submission', content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', read: true },
    // Add more mail items as needed
];

const MailDetails: React.FC<MailDetailsProps> = ({ mailId }) => {
    const selectedMail = mailDetails.find((mail) => mail.id === mailId);

    if (!selectedMail) {
        return <Typography>Please select a mail to read.</Typography>;
    }

    return (
        <div>
            <Typography variant="h6">{selectedMail.subject}</Typography>
            <Typography>{selectedMail.content}</Typography>
        </div>
    );
};



export default About;