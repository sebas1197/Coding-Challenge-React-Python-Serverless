import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>

                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>

                <Button color="inherit" component={Link} to="/chart">
                    Chart
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
