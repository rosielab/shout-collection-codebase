import { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../../index.css';
import { useHistory } from 'react-router';
import { routePaths } from '../routes/routes';

const pages = [
    { name: 'Data Collection', route: routePaths.ACTIVITIES },
    { name: 'Our Purpose', route: routePaths.OUR_PURPOSE },
];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    let history = useHistory();

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavigation = useCallback(
        (route: string) => {
            setAnchorElNav(null);
            history.push(route);
        },
        [history]
    );

    const handleClick = useCallback(
        () => history.push(routePaths.ACTIVITIES),
        [history]
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#db848f' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    ></Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({ name, route }) => (
                                <MenuItem
                                    key={name}
                                    onClick={() => handleNavigation(route)}
                                >
                                    <Typography textAlign="center">
                                        {name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={handleClick}
                        sx={{
                            flexGrow: 1,
                            fontFamily: "'Quicksand', 'sans-serif'",
                            cursor: 'pointer',
                        }}
                    >
                        ROSIE Lab Shout Collection
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map(({ name, route }) => (
                            <Button
                                key={name}
                                onClick={() => {
                                    handleNavigation(route);
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
