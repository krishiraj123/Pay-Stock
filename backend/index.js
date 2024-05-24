require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRoute = require("./routers/userRoute");
const accountRoute = require("./routers/accountRoute");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/account", accountRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
