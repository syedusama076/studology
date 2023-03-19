const mongoose = require('mongoose');

const LibraryBooksSchema = new mongoose.Schema({
    BookName: {
        type: String,
        require: true
    },
    Class: {
        type: String,
        require: true
    },
    Semester: {
        type: String,
        require: false
    },
    ThumbnailPath: {
        type: String,
        require: true
    },
    FilePath: {
        type: String,
        require: true
    }
})

const LibraryBooksModel = mongoose.model('LibraryBook', LibraryBooksSchema)
module.exports = LibraryBooksModel;