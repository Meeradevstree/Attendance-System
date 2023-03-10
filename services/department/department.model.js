const mongoose = require("mongoose");
let softDelete = require('mongoosejs-soft-delete');

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
    {
        department_name:{
            type: String,
            required: false
        },
        discription:{
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false,
            default: ""
        },
        sub_dep_ID: {
            type: Schema.Types.ObjectId,
            ref :"sub_dep"
        },
        total_member:{
            type: String,
            required: false
        }
    },
);

departmentSchema.plugin(softDelete);

const department = mongoose.model("department", departmentSchema);

module.exports = department;