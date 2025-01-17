/* eslint-disable no-unused-vars */
let invoices = [];

export const getInvoices = () => {
  return JSON.parse(localStorage.getItem("invoices")) || [];
};

export const saveInvoice = (invoice) => {
  const invoices = getInvoices();
  if (invoice.id) {
    const index = invoices.findIndex((inv) => inv.id === invoice.id);
    invoices[index] = invoice;
  } else {
    invoice.id = new Date().getTime().toString();
    invoices.push(invoice);
  }
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

export const getInvoiceById = (id) => {
  return getInvoices().find((invoice) => invoice.id === id);
};
