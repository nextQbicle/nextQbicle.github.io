import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DashboardLayout = ({ children }) => {
    const [open, setOpen] = useState(true);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <TopBar toggleSidebar={() => setOpen(!open)} />
            <Sidebar open={open} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
