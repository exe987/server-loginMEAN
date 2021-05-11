const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/database');

//SETTINGS
app.set('port', process.env.PORT || 4000);

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.use('/api', require('./routes/index'));

app.listen(app.get('port'));

console.log('Server on port', app.get('port'));
