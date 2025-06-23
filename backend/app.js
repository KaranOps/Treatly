const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

//Routes
const userRoutes = require('./routes/userRoutes');
const caseRoutes = require('./routes/patientRoutes');


const app = express();

//MiddleWare
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use('/api/user', userRoutes);
app.use('/api', caseRoutes);
app.get('/',(req,res)=>{
    res.send("Treatly");
    console.log("Treatly");
})


const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log(`Server running on Port: ${PORT}`);
})