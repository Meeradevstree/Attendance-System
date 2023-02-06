const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const recordSchema = new Schema(
    {
        present: {
            type: String,
            required: true
        },
        absent: {
            type: String,
            required: true
        },
        half_day: {
            type: String,
            required: true
        }
    },
);

recordSchema.plugin(softDelete);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;