const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
const url = "mongodb+srv://oshehata:node_123@cluster0.dkyzh.mongodb.net/codeZone?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
});


const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter); // api/courses is the base url

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}!`);
});
