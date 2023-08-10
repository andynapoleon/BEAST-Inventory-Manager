import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Login from "scenes/login";
import AddProducts from "scenes/addProducts";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const isAuth = Boolean(useSelector((state) => state.global.token)); // set to True if the token exists
  console.log(isAuth);
  // https://www.w3schools.com/react/react_usememo.asp
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // this hook will run only when "mode" has changed

  return (
    <div className="app" /* "app" lowercase due to convention purposes */>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              element={
                <Layout />
              } /* any route that is a child of this route will have this layout component (sidebar, navbar, ...) */
            >
              <Route
                path="/dashboard"
                element={isAuth ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/products"
                element={isAuth ? <Products /> : <Navigate to="/" />}
              />
              <Route
                path="/addProducts"
                element={isAuth ? <AddProducts /> : <Navigate to="/" />}
              />
              <Route
                path="/customers"
                element={isAuth ? <Customers /> : <Navigate to="/" />}
              />
              <Route
                path="/transactions"
                element={isAuth ? <Transactions /> : <Navigate to="/" />}
              />
              <Route
                path="/geography"
                element={isAuth ? <Geography /> : <Navigate to="/" />}
              />
              <Route
                path="/overview"
                element={isAuth ? <Overview /> : <Navigate to="/" />}
              />
              <Route
                path="/daily"
                element={isAuth ? <Daily /> : <Navigate to="/" />}
              />
              <Route
                path="/monthly"
                element={isAuth ? <Monthly /> : <Navigate to="/" />}
              />
              <Route
                path="/breakdown"
                element={isAuth ? <Breakdown /> : <Navigate to="/" />}
              />
              <Route
                path="/admin"
                element={isAuth ? <Admin /> : <Navigate to="/" />}
              />
              <Route
                path="/performance"
                element={isAuth ? <Performance /> : <Navigate to="/" />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
