import { CssBaseline, ThemeProvider } from "@mui/material"
import {createTheme} from "@mui/material/styles"
import { themeSettings } from "theme"
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "screens/Layout"
import Dashboard from "screens/dashboard"
import Products from 'screens/products'
import Customers from 'screens/customers'
import Transactions from 'screens/transactions'
function App() {
  const mode = useSelector(store => store.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to='/dashboard' replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App
