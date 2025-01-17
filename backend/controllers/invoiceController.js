const Invoice = require('../models/invoice');

exports.createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, clientName, date, amount, status } = req.body;
  
    if (!invoiceNumber || !clientName || !date || !amount || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  const newInvoice = new Invoice({
    invoiceNumber,
    clientName,
    date,
    amount,
    status,
    userId: req.user.id  
  });
  
  await newInvoice.save();
  res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
  



  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateInvoice = async (req, res) => {
  const { id } = req.params;
  const { invoiceNumber, clientName, date, amount, status } = req.body;

  // Validation: Ensure required fields are provided
  if (!invoiceNumber || !clientName || !date || !amount || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Find the invoice by ID
    const invoice = await Invoice.findById(id);

    // Check if invoice exists
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this invoice' });
    }

    invoice.invoiceNumber = invoiceNumber;
    invoice.clientName = clientName;
    invoice.date = new Date(date);
    invoice.amount = amount;
    invoice.status = status;

    await invoice.save();

    res.status(200).json({ message: 'Invoice updated successfully', invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.getInvoiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (invoice.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this invoice' });
    }
    await Invoice.findByIdAndDelete(id);

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllInvoices = async (req, res) => {
  try {
    const { status, startDate, endDate, sortBy, order } = req.query;
    let filter = { userId: req.user.id }; 
    //console.log('Authenticated User ID:', req.user.id);
    if (status) {
      filter.status = status;
    }
    if (startDate || endDate) {
      filter.date = {}; 

      if (startDate) {
        const parsedStartDate = new Date(startDate);
        if (!isNaN(parsedStartDate)) {
          filter.date.$gte = parsedStartDate; 
        } else {
          return res.status(400).json({ message: 'Invalid start date format' });
        }
      }

      if (endDate) {
        const parsedEndDate = new Date(endDate);
        if (!isNaN(parsedEndDate)) {
          filter.date.$lte = parsedEndDate; 
        } else {
          return res.status(400).json({ message: 'Invalid end date format' });
        }
      }
    }

    let sort = {};
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }
    //console.log('Filter:', filter);
    //console.log('Sort:', sort)
    const invoices = await Invoice.find(filter).sort(sort);

    if (invoices.length === 0) {
      return res.status(404).json({ message: 'No invoices found' });
    }

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};























  










  
