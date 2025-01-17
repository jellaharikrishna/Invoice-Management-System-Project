/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/InvoiceFormPage.css";

const InvoiceFormPage = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      //console.log("Fetching invoice with ID:", id);
      const fetchInvoice = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setError("You are not authenticated. Please login.");
            setLoading(false);
            return;
          }
          
          let url = `https://invoice-management-system-project.onrender.com/api/invoices/${id}`
          const response = await fetch(url,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseText = await response.text();
          //console.log("Response text:", responseText);

          if (response.ok) {
            const invoice = JSON.parse(responseText);
            setInvoiceNumber(invoice.invoiceNumber);
            setClientName(invoice.clientName);
            setDate(invoice.date);
            setAmount(invoice.amount);
            setStatus(invoice.status);
            setLoading(false);
          } else {
            setError("Failed to fetch invoice: " + responseText);
            setLoading(false);
          }
        } catch (error) {
          setError("Error fetching invoice: " + error.message);
          setLoading(false);
        }
      };
      fetchInvoice();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!invoiceNumber || !clientName || !date || !amount || !status) {
      setError("All fields are required");
      return;
    }

    const updatedInvoice = { invoiceNumber, clientName, date, amount, status };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authenticated. Please login.");
        return;
      }
      let url = `https://invoice-management-system-project.onrender.com/api/invoices/${id}`

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedInvoice),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Invoice updated successfully!");
        navigate("/home");
      } else {
        throw new Error(data.message || "Failed to update the invoice");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error updating invoice:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not authenticated. Please login.");
          return;
        }
        
        let url = `https://invoice-management-system-project.onrender.com/api/invoices/${id}`
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
          navigate("/home");
        } else {
          throw new Error(data.message || "Failed to delete the invoice");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error deleting invoice:", error);
      }
    }
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Invoice</h2>
      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading invoice data...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <button type="submit">Update Invoice</button>
        </form>
      )}
    </div>
  );
};

export default InvoiceFormPage;
