const moongoose  = require('mongoose')

const UserSchema = new moongoose.Schema({
    userName : {type: String, required: true, min: 1, unique: true},
    password : {type: String, required: true}
});

const UserModel = moongoose.model('User',UserSchema);

module.exports = UserModel