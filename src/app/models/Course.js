const mysql = require('mysql');
const Schema = mysql.Schema;

const Course = new Schema({
    name: { type: String, maxLength: 1000 },
    description: { type: String, maxLength: 1000 },
    image: { type: String, maxLength: 1000 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mysql.model('Course', Course);
