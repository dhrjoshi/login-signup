const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/app');
}

module.exports = connect;