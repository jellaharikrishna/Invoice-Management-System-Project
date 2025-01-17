require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const invoiceRoutes = require("./routes/invoiceRoutes");
const authRoutes = require('./routes/authRoutes'); 
const authenticate = require("./middleware/auth"); 
const app = express();
app.use(cors({
  origin: "https://hkjinvoicemanagementsystem.netlify.app/", 
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.get('/', (req, res) => {
  res.send('Hello, welcome to the Invoice Management System!');
});


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb+srv://rk40665:MMW1YnneDmPNQsbZ@ims.bmhcn.mongodb.net")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.use("/api/auth", authRoutes);

app.use("/api", authenticate, invoiceRoutes); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
