const app = require('./app')
const mongoose = require('./database/mongoose')

app.listen(app.get('port'), () => console.log(`app running at ${app.get('port')}`))