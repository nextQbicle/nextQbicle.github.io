import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { AccountCircle, Menu } from "@mui/icons-material";
import { useUserAuth } from "../../context/UserAuthContext";

const TopBar = ({ toggleSidebar }) => {
    const { user } = useUserAuth();

    return (
        <AppBar position="fixed" sx={{ zIndex: 1300, width: "100%" }}>
            <Toolbar>
                {/* Menu Icon to Toggle Sidebar */}
                <IconButton color="inherit" onClick={toggleSidebar} sx={{ marginRight: 2 }}>
                    <Menu />
                </IconButton>

                {/* Title */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Qubicle Dashboard
                </Typography>

                {/* Profile Info */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ marginRight: 1 }}>
                        Welcome, {user?.name || "User"}
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
