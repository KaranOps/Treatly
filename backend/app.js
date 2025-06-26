const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

//Routes
const userRoutes = require('./routes/userRoutes');
const caseRoutes = require('./routes/patientRoutes');
const aiRoutes = require("./routes/aiRoutes");


const app = express();

//MiddleWare
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development 
    'https://treatly-uthh.onrender.com', // Your deployed frontend
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/user', userRoutes);
app.use('/api', caseRoutes);
app.use("/api", aiRoutes);

app.get('/',(req,res)=>{
    res.send("Treatly");
    console.log("Treatly");
})


const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log(`Server running on Port: ${PORT}`);
})