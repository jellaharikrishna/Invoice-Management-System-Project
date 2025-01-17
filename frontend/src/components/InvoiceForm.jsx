/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/InvoiceForm.css"

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    title: "",
    amount: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //let url = 'https://hkjinvoicemanagementsystem.netlify.app/api/invoices'
    let url = " http://localhost:3000/api/invoices"

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      });

      if (!response.ok) {
        throw new Error("Failed to add invoice");
      }

      const newInvoice = await response.json();
      //console.log("New invoice added:", newInvoice);

      
      navigate("/"); 

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={invoice.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={invoice.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Invoice"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InvoiceForm;




































