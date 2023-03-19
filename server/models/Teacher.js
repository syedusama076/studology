const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const TeacherSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Age: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    Education: {
        type: String,
        required: true,
    },
    TeachingExperience: {
        type: String,
        required: true,
    },
    OnlineTeachingExperience: {
        type: String,
        required: true,
    },
    TeachingSubject: {
        type: String,
        required: true,
    },
    Description: {
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
            default: "https://res.cloudinary.com/dkrus5d8x/image/upload/v1668951437/default_user_ks3o15.png",
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
TeacherSchema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 12);
        this.cPassword = this.Password;
    } next();
});
// Token is creating
TeacherSchema.methods.generateAuthToken = async function () {
    try {
        // creating the token for the user and save it in a database
        // jwt.sign(payload(uniqueId()), secretKey or Privatekey, )
        let tokenCreated = jwt.sign({ _id: this._id }, process.env.SECRET_KEY_TEACHER);
        this.tokens = this.tokens.concat({ token: tokenCreated });
        await this.save();
        return tokenCreated;
    } catch (err) {
        console.log(err);
    }
}

const TeachersModel = mongoose.model('teachers', TeacherSchema);
module.exports = TeachersModel;
