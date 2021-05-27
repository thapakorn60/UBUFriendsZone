const mongoose = require('mongoose');
const User = mongoose.Schema({
    email: String,
    password: String,
    img: String,
}, { timestamp: true });
module.exports = mongoose.model('User', User);

module.exports.getUserByUsername = (email, callback) => {
    const query = { email: email }
    User.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getUserById = (id, callback) => {
    Users.findById(id, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}