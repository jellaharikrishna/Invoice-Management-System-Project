/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import HomePage from "./pages/HomePage"; 
import InvoiceFormPage from "./pages/InvoiceFormPage";
import Header from "./components/Header";
import AddInvoice from "./components/AddInvoice";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import "./App.css";

const App = () => {
  const [invoices, setInvoices] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); 
      fetchInvoices(token); 
    }
  }, []);

  const fetchInvoices = async (token) => {

    //let url = 'https://hkjinvoicemanagementsystem.netlify.app/api/invoices'
    let url = "http://localhost:5173/api/invoices"
    
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
      const data = await response.json();
      if (response.ok) {
        setInvoices(data); 
      } else {
        console.error("Failed to fetch invoices");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token); 
    setIsAuthenticated(true); 
    fetchInvoices(token); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
    setInvoices([]); 
  };

  return (
    <>
      <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/add-invoice" element={<AddInvoice />} />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <HomePage invoices={invoices} /> 
              ) : (
                <Navigate to="/login" /> 
              )
            }
          />
          <Route
            path="/invoice-form/:id?"
            element={
              isAuthenticated ? (
                <InvoiceFormPage invoices={invoices} /> 
              ) : (
                <Navigate to="/login" /> 
              )
            }
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />} e
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </>
  );
};

export default App;











