require("dotenv").config()
const express = require('express')
const app = express();









app.listen(process.env.PORT || 4000 , (req,res) => {
    console.log(`Server is Live on ${process.env.PORT}`);
    
})