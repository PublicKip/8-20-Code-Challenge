const mongoose = require('mongoose');
const { Schema } = mongoose;

const Team = mongoose.model("Team", new Schema({ name: String , wins: Number, losses: Number, logo: String }));

module.exports = Team ;

