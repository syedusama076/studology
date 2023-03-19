const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const AdminSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    UserName: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    cPassword: {
        type: String,
        required: true,
    },
    Image: {
        public_id: {
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        },
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

// Hashing the password fields
AdminSchema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 12);
        this.cPassword = this.Password;
    } next();
});
// Token is creating
AdminSchema.methods.generateAuthToken = async function () {
    try {
        // creating the token for the user and save it in a database
        // jwt.sign(payload(uniqueId()), secretKey or Privatekey, )
        let tokenCreated = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_STUDENT);
        this.tokens = this.tokens.concat({ token: tokenCreated });
        await this.save();
        return tokenCreated;
    } catch (err) {
        console.log(err);
    }
}

const AdminModel = mongoose.model('admins', AdminSchema);
module.exports = AdminModel;
