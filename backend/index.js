const express = require("express");
const app = express();
var cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api", require("./routes/job"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
