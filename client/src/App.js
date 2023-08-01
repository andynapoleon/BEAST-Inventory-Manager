import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  const mode = useSelector((state) => state.global.mode);
  // https://www.w3schools.com/react/react_usememo.asp
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // this hook will run only when "mode" has changed

  return (
    <div className="app" /* "app" lowercase due to convention purposes */>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              element={
                <Layout />
              } /* any route that is a child of this route will have this layout component (sidebar, navbar, ...) */
            >
              <Route
                path="/"
                element={
                  <Navigate to="/dashboard" replace />
                } /* the default homepage is always the dashboard route */
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
