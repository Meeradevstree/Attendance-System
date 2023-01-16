const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
    {
        employeeID: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },
        employeeid:{
            type: String,
            required: false,
        },
        attendance:[{
            date:{
                type:String
            },
            entry:{type:String}
        }],
    },
);

attendanceSchema.plugin(softDelete);

const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;