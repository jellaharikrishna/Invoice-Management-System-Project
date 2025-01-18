/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";
import Filter from "../components/Filter";
import "../../styles/HomepageStyles.css";

const HomePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const fetchInvoices = async (token) => {
      let url = 'https://invoice-management-system-project.onrender.com/api/invoices'
<<<<<<< HEAD
=======
      
>>>>>>> 5a1cc9a8eb208fee5214715ccaceaeca7cae19f9

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
          setFilteredInvoices(data);
        } else {
          setError(data.message || "Failed to fetch invoices");
        }
      } catch (error) {
        setError("Error fetching invoices: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices(token);
  }, []);

  const handleFilter = (status) => {
    if (status === "") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((invoice) => invoice.status === status);
      setFilteredInvoices(filtered);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not authenticated. Please login.");
          return;
        }
        
        let url = `https://invoice-management-system-project.onrender.com/api/invoices/${id}`
<<<<<<< HEAD
=======
        
>>>>>>> 5a1cc9a8eb208fee5214715ccaceaeca7cae19f9
        const response = await fetch(url,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert("Invoice deleted successfully!");
          setInvoices(invoices.filter((invoice) => invoice._id !== id));
          setFilteredInvoices(
            filteredInvoices.filter((invoice) => invoice._id !== id)
          );
        } else {
          throw new Error(data.message || "Failed to delete the invoice");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error deleting invoice:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="home-container">
      <h2>Invoice Management System</h2>
      <Filter onFilter={handleFilter} />
      <Link to="/add-invoice" className="add-button">
        Add Invoice
      </Link>
      {filteredInvoices.length === 0 ? 
      <div>
        <h2>No Invoices found</h2>
      </div> :
      <div className="invoice-list">
        {filteredInvoices.map((invoice) => (
          <div key={invoice._id} className="invoice-item">
            <InvoiceCard invoice={invoice} />
            <button
              onClick={() => handleDelete(invoice._id)}
              className="delete-button"
            >
              Delete
            </button>
            <Link to={`/invoice-form/${invoice._id}`} className="edit-button">
              Edit
            </Link>
          </div>
        ))}
      </div>
}
    </div>
  );
};

export default HomePage;
