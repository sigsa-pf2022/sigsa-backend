const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sigsa')
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))

module.exports = mongoose;