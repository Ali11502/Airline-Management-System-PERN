const express = require("express");
const cors = require('cors');
const cookieParse = require("cookie-parser")
const app = express();
// Allow requests from any origin
// Enable CORS with specific origin
// Allow requests from any origin
// Enable CORS with specific origins (http://localhost:3000 and http://localhost:3001)
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'], // replace with your React app's URLs
  credentials: true,
};

app.use(cors(corsOptions));

const dotenv = require("dotenv");
dotenv.config();
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const aircraftRoutes = require("./routes/aircraft")
const flightRoutes = require("./routes/flight");
const customerRoutes = require("./routes/passenger");
const reservationRoutes = require("./routes/reservation");
const paymentRoutes = require("./routes/payment");

const erpAuthRoutes = require("./routes-erp/erpAuth");
const erpEmployeeRoutes = require("./routes-erp/erpEmployee");
const erpAssignmentRoutes = require("./routes-erp/erpAssignments");


const {protect, checkAdmin} = require("./routes/token");


app.use(express.json());
app.use(cookieParse());

//AMS Main Application
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/aircrafts", aircraftRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/passengers", customerRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/payments", paymentRoutes);

//AMS Mini ERP Application
app.use("/api/erpAuth", erpAuthRoutes);
app.use("/api/erpEmployee", erpEmployeeRoutes);
app.use("/api/erpAssignment", erpAssignmentRoutes);





app.use(errorHandler);
app.use(notFound);
app.use(protect);
app.use(checkAdmin);

app.listen(5000, ()=>{
    console.log(`backend server is running`)
});