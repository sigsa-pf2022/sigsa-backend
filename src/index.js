require("dotenv").config();
require("./database");
const express = require("express");
const logger = require("morgan");
const bp = require("body-parser");

const app = express();
const PORT = process.env.PORT;

app.use(logger("dev"));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false })); //http://expressjs.com/en/5x/api.html#express.urlencoded

const userRouter = require("./routes/user");

app.use("/users", userRouter);

const server = app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

module.exports = { app, server };
