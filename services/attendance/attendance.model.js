const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
    {
        employeeID: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },
        employeeid: {
            type: String,
            required: false,
        },
        Months: {
            January: [{
                date: {
                    type: String,
                    require: false
                },
                record: {
                    type: String,
                    enum: ["present","absent","half-day","holiday"],
                    default: "present",
                    required: false,
                }
            }]
        },
    },
);

attendanceSchema.plugin(softDelete);

const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;