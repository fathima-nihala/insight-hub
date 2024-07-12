import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';
import homeIcon1 from '../assets/homeWhite.svg';
import homeIcon2 from '../assets/home.png';
import prof1 from '../assets/prof1.svg'
import prof2 from '../assets/prof2.svg'
import MenuIcon from '@mui/icons-material/Menu';



const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        border: 'none',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            borderRight: 'none',
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            borderRight: 'none',
        }),
    }),
);

export default function Sidebar() {
    const [open, setOpen] = React.useState(true);
    const [iconHovered, setIconHovered] = React.useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: 'Home', route: '/', icon1: homeIcon1, icon2: homeIcon2 },
        { text: 'Profile', route: '/profile', icon1: prof1, icon2: prof2 }, // Add icons for Profile if available
    ];

    return (
        <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open} sx={{ border: 'none' }}>
                <DrawerHeader>
                    <div className="flex items-center justify-between w-full px-3">
                        <MenuIcon onClick={() => setOpen(!open)} className='cursor-pointer ' />
                        {open ? (
                            <div onClick={() => navigate('/')} className='flex justify-end cursor-pointer'>
                                <h2 className='text-indigo-900 font-bold text-[30px] p-5 w-[220px]p-5 cursor-pointer w-[220px]' onClick={() => setOpen(!open)}>InSightHub</h2>
                            </div>
                        ) : null}
                    </div>
                </DrawerHeader>
                <List sx={{ margin: 0 }}>
                    {menuItems.map((item, index) => {
                        const isSelected = location.pathname === item.route;

                        return (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ display: 'block' }}
                                onMouseEnter={() => setIconHovered(index)}
                                onMouseLeave={() => setIconHovered(null)}
                                onClick={() => navigate(item.route)}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 34,
                                        marginX: 1,
                                        marginY: 1,
                                        borderRadius: 2,
                                        justifyContent: open ? 'initial' : 'center',
                                        color: isSelected || iconHovered === index ? 'white' : '#737791',
                                        backgroundColor: isSelected ? '#312e81' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: '#312e81',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: isSelected || iconHovered === index ? 'white' : '#737791',
                                        }}
                                    >
                                        {item.icon1 && item.icon2 && (
                                            <img
                                                src={isSelected || iconHovered === index ? item.icon1 : item.icon2}
                                                alt={item.text}
                                            />
                                        )}
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText
                                            primary={item.text}
                                            sx={{
                                                opacity: open ? 1 : 0,
                                                color: isSelected || iconHovered === index ? 'white' : '#737791',
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </Box>
    );
}




