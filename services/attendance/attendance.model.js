const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
    {
        employeeID: {
            type: Schema.Types.ObjectId,
            ref :"Employee"
        },
        // attendance:[{
        //     date:[{
        //         type:Date,
        //         default:Date.now,
        //     }],
        //     entry:{type:Date}
        // }]
    },
);

attendanceSchema.plugin(softDelete);

const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;