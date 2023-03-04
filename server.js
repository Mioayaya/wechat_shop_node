const express = require("express");
const app = express();

const Users = require("./routers/Users");

app.get("/",(req,res) => {
  res.send("hello express");
})

app.use("/api/user",Users);

app.listen(5000,() => {
  console.log("Server is running on port 5000···");
})
