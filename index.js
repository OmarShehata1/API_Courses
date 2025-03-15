const express = require("express");
const app = express();
app.use(express.json());


const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter); // api/courses is the base url

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}!`);
});
