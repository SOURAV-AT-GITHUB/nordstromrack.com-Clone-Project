const mongoose = require("mongoose")
require("dotenv")
const DATABASE_URL = process.env.DATABASE_URL

const DBConnection = mongoose.connect(DATABASE_URL)
module.exports = DBConnection