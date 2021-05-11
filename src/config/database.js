const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

mongoose
    .connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((db) => console.log('Database is connected'))
    .catch((err) => console.log(err));
