require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const httpStatusText = require("./utils/httpStatusText");

const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB");
});

const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter); // api/courses is the base url
app.use("/api/users", require("./routes/users.route")); // api/users is the base url

// global midlware for not found router
app.all("*", (req, res) => {
  res.status(404).json({
    status: httpStatusText.ERROR, message : "Route not Found",
    data: null,
  });
});

// glolbal error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode ||500 ).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message,
    code : err.statusCode || 500,
    data: null,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}!`);
});
