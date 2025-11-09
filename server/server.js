require("dotenv").config()
require("./configs/DB.js")
const express = require('express')
const app = express();
const DB = require("./configs/DB.js")

const userRouter = require("./routers/userRouter")
const postRouter = require("./routers/postRouter.js")


app.use(express.json());



app.use("/api/user",userRouter);
app.use("/api/posts",postRouter);





app.listen(process.env.PORT || 4000 , () => {
    console.log(`Server is Live on ${process.env.PORT}`);
    
})