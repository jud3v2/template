const mongoose = require('mongoose');
const config = require('../config');


const db = mongoose;

db.connection.on('error', console.error.bind(console, 'connection error:'));
db.connection.once('open', () => {
    //console.log('MongoDB connected !');
});

const connect = () => {
    return mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
}

(async () => {
        await connect();
})()

module.exports = db;