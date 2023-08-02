import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined, // "outline" components are literally just icons
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

// an array of navigation items where we will show on the sidebar
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation(); // get the path that we're currently at
  const [active, setActive] = useState(""); // control the state of the page we're currently at
  const navigate = useNavigate(); // navigate to other pages
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1)); // keep track of URL we're at to determine which page we're currently on
  }, [pathname]); // anytime URL changes (pathname as the parameter), we set the active value to the current page. useEffect() runs on the 1st render and re-runs everytime pathname changes.

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen} // true - open
          onClose={() => setIsSidebarOpen(false)} // close the drawer and set state to false
          variant="persistent"
          anchor="left" // left side of the scrren
          sx={{
            width: drawerWidth, // drawerWidth set before
            "& .MuiDrawer-paper": {
              // modify some of the CSS they already have - we have to look up this class sometimes annoying
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold" size="large">
                    BEAST SUPPS
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText); // move to that page when clicked, setActive to highlight the color
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText // highlight the color of the listitem when we're currently on that page
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
              <ListItem disablePadding>
                <Box position="relative" mt="1rem">
                  <Divider sx={{ m: "1rem 0rem 1rem 1.25rem" }} />
                  <FlexBetween
                    textTransform="none"
                    gap="1rem"
                    m="2.25rem 0 2.25rem 3rem"
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={profileImage}
                      height="40px"
                      width="40px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }} // crops the image to fit in the circle
                    />
                    <Box textAlign="left">
                      <Typography
                        fontWeight="bold"
                        fontSize="0.9rem"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {user.name}
                      </Typography>
                      <Typography
                        fontSize="0.8rem"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        {user.occupation}
                      </Typography>
                    </Box>
                    <SettingsOutlined
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "25px ",
                      }}
                    />
                  </FlexBetween>
                </Box>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
