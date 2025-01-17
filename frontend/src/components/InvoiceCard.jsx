/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";
import "../../styles/InvoiceCard.css"; 

const InvoiceCard = ({ invoice, handleDelete }) => {
  const { id, invoiceNumber, clientName, date, amount, status } = invoice;

  return (
    <div className="invoice-card">
      <h3>Invoice No: {invoiceNumber}</h3>
      <p>
        <strong>Client:</strong> {clientName}
      </p>
      <p>
        <strong>Date:</strong> {new Date(date).toLocaleDateString()}
      </p>
      <p>
        <strong>Amount:</strong> ${amount}
      </p>
      <p>
        <strong>Status:</strong>
        <span className={`status ${status}`}>{status}</span>
      </p>
    </div>
  );
};

export default InvoiceCard;
