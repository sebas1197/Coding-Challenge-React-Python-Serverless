import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/home">
                    Home
                </Button>

                <Button color="inherit" component={Link} to="/chart">
                    Chart
                </Button>

                <Button color="inherit" component={Link} to="/login">
                    Log out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
