const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.yqw48pz.mongodb.net/socialmedia?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
