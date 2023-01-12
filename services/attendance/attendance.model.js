const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
    {
        date: {
            type: String,
            required: true
        },
        employeeID: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },
        recordID: {
            type: Schema.Types.ObjectId,
            ref: "Record"
        }
    },
);

attendanceSchema.plugin(softDelete);

const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;