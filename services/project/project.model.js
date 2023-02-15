const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        procjectName:{
            type: String,
            required: true
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
        }]
    },
);

projectSchema.plugin(softDelete);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;