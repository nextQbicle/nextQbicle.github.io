import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton } from "@mui/material";
import { Home, CheckCircle, CloudUpload, PersonAdd, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const Sidebar = ({ open }) => {
    const navigate = useNavigate();
    const { user } = useUserAuth();

    const menuItems = [
        { text: "Home", icon: <Home />, path: "/home" },
        { text: "Document Upload", icon: <CloudUpload />, path: "/document-upload-dashboard" },
        { text: "Verification", icon: <CheckCircle />, path: "/verification-dashboard" },
    ];

    if (user?.role === "super_admin") {
        menuItems.push({ text: "Add New User", icon: <PersonAdd />, path: "/add-user" });
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? 240 : 60,
                flexShrink: 0,
                transition: "width 0.3s ease-in-out",
                "& .MuiDrawer-paper": { width: open ? 240 : 60, overflowX: "hidden", transition: "width 0.3s ease-in-out" }
            }}
        >
            {/* Collapse/Expand Button */}
            <List>
                <ListItem disablePadding>
                    <IconButton sx={{ margin: "10px auto" }} onClick={() => open.toggleSidebar()}>
                        <Menu />
                    </IconButton>
                </ListItem>
            </List>

            <Divider />

            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton sx={{ height: 40 }} onClick={() => navigate(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {open && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
