const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SprintSchema = new Schema({
  idUser:{ type: String , required: true, trim:true},
  length: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  start: { type: String, required: true, trim: true },
  finish: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Sprint',SprintSchema);
