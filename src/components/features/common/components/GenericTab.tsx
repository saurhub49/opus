import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs } from "@mui/material";
import { a11yProps } from "../utils/tabs.utils";
import TabPanel from "../helpers/TabPanel";

interface TabProps {
    label: string;
    node: React.ReactNode;
}

interface GenericTabProps {
    items: TabProps[];
}

const GenericTab: React.FC<GenericTabProps> = (props) => {
    const { items } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = React.useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {items.map((item, index) => (
                        <Tab key={index} label={item.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {items.map((item, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {item.node}
                </TabPanel>
            ))}
        </Box>
    );

}

export default GenericTab;