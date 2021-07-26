const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const chalk = require("chalk");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = config.get("mongodbPort") || 3080;

async function start() {
  try {
   await mongoose.connect(config.get("mongoUri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
   })
   app.listen(PORT, () => console.log(chalk.blue(`Connection to MongoDB has been established, server has been started on port ${PORT}...`)));
  } catch (e) {
    console.log("Server Error",e.message);
    process.exit(1);
  }
}

start();

app.use('/api/hello', (req, res) => {
  console.log(req)
  res.send({ target: 'hello' })
})