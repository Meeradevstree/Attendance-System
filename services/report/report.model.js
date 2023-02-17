const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const reportSchema = new Schema(
    {
        reportingDate:{
            type: String,
            required: false
        },
        projectName:{
            type: Schema.Types.ObjectId,
            ref: "Project"
        },
        discription:{
            type: String,
            required: false
        },
        hourSpend:{
            type: String,
            required: false
        },
        status:{
            type: String,
            enum: ["ongoing","r&d","pending","completed"],
            default: "ongoing",
            required: false,
        },
        remark:{
            type: String,
            required: false
        },
        employeeName:{
            type: Schema.Types.ObjectId,
            ref: "Employee"
        },
        // projectManager:{
        //     type: Schema.Types.ObjectId,
        //     ref: "Project"
        // },
        // teamLeader:{
        //     type: Schema.Types.ObjectId,
        //     ref: "Project"
        // },
    },
);

reportSchema.plugin(softDelete);

const report = mongoose.model("report", reportSchema);

module.exports = report;