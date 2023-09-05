const mongoose = require('mongoose')
const config = require("../config");

// db connection
(async () => {
    try {
      const db = await mongoose.connect(config.MONGO_URI);
      console.log("DB connectected to ", db.connection.name);
    } catch (error) {
      console.error(error);
    }
  })();