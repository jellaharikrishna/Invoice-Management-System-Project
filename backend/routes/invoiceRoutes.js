
const express = require("express");
const router = express.Router();


const invoiceController = require("../controllers/invoiceController");


const authenticate = require("../middleware/auth");

router.post("/invoices", authenticate, invoiceController.createInvoice);

router.get("/invoices", authenticate, invoiceController.getAllInvoices);


router.get("/invoices/:id", authenticate, invoiceController.getInvoiceById);

router.put("/invoices/:id", authenticate, invoiceController.updateInvoice);

router.delete("/invoices/:id", authenticate, invoiceController.deleteInvoice);

module.exports = router;
