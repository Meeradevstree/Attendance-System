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
            January: {
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            February:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            March:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            April:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            May:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            June:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            July:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            August:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            September:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            October:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            November:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
            December:{
                record: [{
                    type: Schema.Types.ObjectId,
                    ref: "Date"
                }]
            },
        },
    },
);

attendanceSchema.plugin(softDelete);

const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;