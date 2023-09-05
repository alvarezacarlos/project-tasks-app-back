const express = require("express");
const config = require("./config");
const cors = require("cors");
const app = express();
const taskRouter = require('./routes/tasks.routes')

app.use(express.json());
app.use(cors());
app.set("port", config.PORT);
app.use('/api/tasks/', taskRouter)

module.exports = app;