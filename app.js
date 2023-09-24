const express = require("express");
const config = require("./config");
const cors = require("cors");
const app = express();
const taskRouter = require('./routes/tasks.routes')
const userRouter = require('./routes/users.routes')
const companiesRouter = require('./routes/companies.routes')

app.use(express.json());
app.use(cors());
app.set("port", config.PORT);

app.use('/api/tasks/', taskRouter)
app.use('/api/auth/', userRouter)
app.use('/api/companies/', companiesRouter)

module.exports = app;