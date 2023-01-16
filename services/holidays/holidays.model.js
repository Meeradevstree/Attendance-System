const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const holidaysSchema = new Schema(
    {
        holiday_name:{
            type: String,
            required: true
        },
        holiday_date:{
            type: String,
            required: true
        },
        holiday_day:{
            type: String,
            required: false
        }
    },
);

holidaysSchema.plugin(softDelete);

const Holidays = mongoose.model("Holidays", holidaysSchema);

module.exports = Holidays;