const mongoose = require('mongoose')

const downloadSchema = new mongoose.Schema({
    title: String,
    imgFileName: String,
    pdfFileName: String,
    content1: String,
    content2: String,
    content3: String,
    content4: String,
    author: String,
    keywords: String,
    size: Number,
    downloads: Number,
    created: {
        type: Date,
        default: Date.now
    }
})


module.exports = downloadSchema;