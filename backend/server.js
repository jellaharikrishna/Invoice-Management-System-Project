const dotEnv = require('dotenv')
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const invoiceRoutes = require("./routes/invoiceRoutes");
const authRoutes = require('./routes/authRoutes'); 
const authenticate = require("./middleware/auth"); 
const app = express();

//let url = "https://hkjinvoicemanagementsystem.netlify.app/"
const allowedOrigins = [
  'http://localhost:5173',
  'https://hkjinvoicemanagementsystem.netlify.app',
];

let corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}
app.use(cors(corsOptions));
dotEnv.config();

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
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
