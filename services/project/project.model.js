const { findLastIndex } = require("lodash");
const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        projectName:{
            type: String,
            required: false
        },
        projectStatus:{
            type: String,
            enum: ["pending","complete"],
            default: "pending",
            required: false,
        },
        projectMember:[{
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }],
        projectLeader:[{
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }],
        client:{
            type: String,
            required: false
        },
        projectDeadline:{
            type: String,
            required: false
        },
        projectDescription:{
            type: String,
            required: false
        },
        projectManager:[{
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }],
        image: {
            type: String,
            required: false,
            default: ""
        }
    },
);

projectSchema.plugin(softDelete);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;