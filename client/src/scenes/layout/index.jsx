import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)"); // true on desktop screen (minimum 600px)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // control the state if the side bar is open or not
  const userId = useSelector((state) => state.global.userId);
  //const token = useSelector((state) => state.global.token);
  // console.log("ID", userId);
  // console.log("TOKEN:", token);
  const { data } = useGetUserQuery(userId);
  // console.log("data", data);
  // console.log(process.env.REACT_APP_BASE_URL);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px" // this only takes up the width of 250px
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1} /* this box will take as much as it can on a screen */>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} /*navbar on every page*/
        />
        <Outlet /* this represents whatever is underneath */ />
      </Box>
    </Box>
  );
};

export default Layout;
